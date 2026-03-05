import sys
import os

files = [
    (r"c:\Users\Newt\Desktop\travel umroh\src\app\paket-umroh\page.tsx", 'umroh'),
    (r"c:\Users\Newt\Desktop\travel umroh\src\app\paket-haji\page.tsx", 'haji'),
    (r"c:\Users\Newt\Desktop\travel umroh\src\app\paket-wisata\page.tsx", 'wisata')
]

for filepath, cat in files:
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()

    # Normalize line endings
    content = content.replace('\r\n', '\n')

    old_target = f'useEffect(() => {{ setPakets(getPaketsByKategori("{cat}")); }}, []);\n'
    old_target_alt = f'useEffect(() => {{ setPakets(getPaketsByKategori("{cat}")); }}, []);'
    new_target = f'useEffect(() => {{ fetch("/api/pakets").then(r => r.json()).then(d => setPakets((d || []).filter((p: Paket) => p.kategori === "{cat}"))); }}, []);\n'

    if old_target in content:
        content = content.replace(old_target, new_target)
        print(f"Updated {cat} (newline match)")
    elif old_target_alt in content:
        content = content.replace(old_target_alt, new_target.strip())
        print(f"Updated {cat} (no newline match)")
    else:
        print(f"NOT FOUND in {cat} - searching around...")
        idx = content.find("useEffect(")
        if idx != -1:
            print(repr(content[idx:idx+80]))

    with open(filepath, 'w', encoding='utf-8', newline='') as f:
        f.write(content.replace('\n', '\r\n'))

print("All done")
