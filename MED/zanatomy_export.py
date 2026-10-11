# Z-Anatomy -> bin/json exporter.
# Run inside Blender:  blender Startup.blend --background --python zanatomy_export.py
# (Startup.blend is the Z-Anatomy model file from github.com/Z-Anatomy/Models-of-human-anatomy)
# Needs ~8 GB RAM. Meshes -> zexport/*.bin (verts float32 + triangles int32),
# curves (nerves/vessels) -> zexport/*.json. Then convert to GLB with trimesh.
# License: CC BY-SA 4.0 — credit "Z-Anatomy - The libre 3D atlas of anatomy".
import bpy, re, numpy as np, os, json
OUT=os.path.join(os.path.dirname(bpy.data.filepath) or os.getcwd(), 'zexport')
os.makedirs(OUT, exist_ok=True)
WANT = ['Abducens nerve (VI).l', 'Abducens nerve (VI).r', 'Accessory nerve (XI).l', 'Accessory nerve (XI).r', 'Adenohypophysis', 'Anterior horn of spinal cord', 'Anterior segment of eyeball.l', 'Anterior segment of eyeball.r', 'Caudate nucleus.l', 'Caudate nucleus.r', 'Cochlea.l', 'Cochlea.r', 'Cochlear nerve', 'Cornea.l', 'Cornea.r', 'Corpus callosum', 'Epididymis.l', 'Epididymis.r', 'Epiglottis', 'Ethmoid bone', 'Facial nerve (VII).l', 'Facial nerve (VII).r', 'Falx cerebri', 'Fornix.l', 'Fornix.r', 'Frontal bone', 'Globus pallidus.l', 'Globus pallidus.r', 'Glossopharyngeal nerve (IX).l', 'Glossopharyngeal nerve (IX).r', 'Greater omentum', 'Hippocampus.l', 'Hippocampus.r', 'Hyoid bone', 'Hypoglossal nerve (XII).l', 'Hypoglossal nerve (XII).r', 'Hypothalamus', 'Inferior nasal concha bone.l', 'Inferior nasal concha bone.r', 'Lacrimal bone.l', 'Lacrimal bone.r', 'Laryngopharynx', 'Lens.l', 'Lens.r', 'Mandible', 'Maxilla.l', 'Maxilla.r', 'Medulla oblongata.l', 'Medulla oblongata.r', 'Midbrain.l', 'Midbrain.r', 'Motor root of trigeminal nerve.l', 'Motor root of trigeminal nerve.r', 'Nasal bone.l', 'Nasal bone.r', 'Nasopharynx', 'Neurohypophysis', 'Occipital bone', 'Oculomotor nerve (III).l', 'Oculomotor nerve (III).r', 'Oesophagus', 'Olfactory nerve (I).l', 'Olfactory nerve (I).r', 'Optic nerve (II).l', 'Optic nerve (II).r', 'Oropharynx', 'Palatine bone.l', 'Palatine bone.r', 'Parietal bone.l', 'Parietal bone.r', 'Parotid gland.l', 'Parotid gland.r', 'Pineal gland', 'Pons.l', 'Pons.r', 'Posterior horn of spinal cord', 'Posterior segment of eyeball.l', 'Posterior segment of eyeball.r', 'Prostate', 'Putamen.l', 'Putamen.r', 'Retina.l', 'Retina.r', 'Sensory root of trigeminal nerve.l', 'Sensory root of trigeminal nerve.r', 'Sphenoid bone', 'Sublingual gland.l', 'Sublingual gland.r', 'Submandibular gland.l', 'Submandibular gland.r', 'Suprarenal gland.l', 'Suprarenal gland.r', 'Temporal bone.l', 'Temporal bone.r', 'Tentorium cerebelli.l', 'Tentorium cerebelli.r', 'Testis.l', 'Testis.r', 'Thalamus.l', 'Thalamus.r', 'Tongue', 'Trachea', 'Trochlear nerve (IV).l', 'Trochlear nerve (IV).r', 'Vagus nerve (X).l', 'Vagus nerve (X).r', 'Vestibule.l', 'Vestibule.r', 'Vestibulocochlear nerve (VIII).l', 'Vestibulocochlear nerve (VIII).r', 'Vomer', 'White matter of spinal cord', 'White matter of telencephalon.l', 'White matter of telencephalon.r']
want = set(WANT)
idx=[]
for o in bpy.data.objects:
    nm = o.name
    if nm.endswith('.j') or nm.endswith('.g') or nm.endswith('.t'):
        continue
    base = re.sub(r'\.\d+$','',nm)
    if nm not in want and base not in want:
        continue
    if o.type == 'MESH':
        m = o.data
        nv = len(m.vertices)
        if nv == 0:
            continue
        v = np.empty(nv*3, dtype=np.float32)
        m.vertices.foreach_get('co', v)
        V = v.reshape(-1,3)
        M = np.array(o.matrix_world, dtype=np.float64)
        Vw = (M[:3,:3] @ V.T).T + M[:3,3]
        m.calc_loop_triangles()
        lt = np.empty(len(m.loop_triangles)*3, dtype=np.int32)
        m.loop_triangles.foreach_get('vertices', lt)
        fn = re.sub(r'[^A-Za-z0-9]+','_',nm).strip('_').lower()[:60]
        with open(os.path.join(OUT, fn+'.bin'),'wb') as f:
            np.array([len(Vw), len(lt)//3], dtype=np.int32).tofile(f)
            Vw.astype(np.float32).tofile(f)
            lt.tofile(f)
        idx.append((nm, len(Vw), len(lt)//3))
    elif o.type == 'CURVE':
        spls=[]
        for s in o.data.splines:
            pts=[p.co[:3] for p in s.points] if s.points else [bp.co[:3] for bp in s.bezier_points]
            if len(pts)>=2:
                spls.append(pts)
        if not spls:
            continue
        M = np.array(o.matrix_world, dtype=np.float64)
        spls=[[ (M[:3,:3]@np.array(p)+M[:3,3]).tolist() for p in sp] for sp in spls]
        fn = re.sub(r'[^A-Za-z0-9]+','_',nm).strip('_').lower()[:60]
        with open(os.path.join(OUT, fn+'.json'),'w') as f:
            json.dump(dict(splines=spls), f)
        idx.append((nm, 'curve', len(spls)))
print('EXPORTED', len(idx))
for i in idx: print('  ', i[0], i[1], i[2])
