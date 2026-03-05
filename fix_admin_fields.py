import sys

path = r'c:\Users\Newt\Desktop\travel umroh\src\app\admin\page.tsx'

with open(path, 'r', encoding='utf-8') as f:
    content = f.read()

content = content.replace('\r\n', '\n')

# 1. Add kotaAsal to EMPTY_FORM
old_empty = '    hotelMekkahBintang: 4, maskapai: "",\n    tanggalBerangkat: [], statusPublish: "Tersedia",'
new_empty = '    hotelMekkahBintang: 4, maskapai: "", kotaAsal: "",\n    tanggalBerangkat: [], statusPublish: "Tersedia",'

if old_empty in content:
    content = content.replace(old_empty, new_empty)
    print('EMPTY_FORM: OK')
else:
    print('EMPTY_FORM: NOT FOUND')

# 2. Add kotaAsal, hotelMekkahBintang, fasilitas inputs to FormPanel
# Insert after the Maskapai input row (line with IoAirplaneOutline)
old_form = '                        <div><Label icon={IoAirplaneOutline}>Maskapai</Label><Input type="text" placeholder="cth: Garuda Indonesia" value={form.maskapai || ""} onChange={e => f("maskapai", e.target.value)} /></div>\n                        <div><Label icon={IoRocketOutline}>Status Paket</Label>'

new_form = '''                        <div><Label icon={IoAirplaneOutline}>Maskapai</Label><Input type="text" placeholder="cth: Garuda Indonesia" value={form.maskapai || ""} onChange={e => f("maskapai", e.target.value)} /></div>
                        <div><Label icon={IoLocationOutline}>Berangkat Dari</Label><Input type="text" placeholder="cth: Jakarta (CGK)" value={form.kotaAsal || ""} onChange={e => f("kotaAsal", e.target.value)} /></div>
                        <div><Label icon={IoStarOutline}>Bintang Hotel</Label><Select value={form.hotelMekkahBintang || 4} onChange={e => f("hotelMekkahBintang", Number(e.target.value))}><option value={5}>⭐⭐⭐⭐⭐ Bintang 5</option><option value={4}>⭐⭐⭐⭐ Bintang 4</option><option value={3}>⭐⭐⭐ Bintang 3</option><option value={2}>⭐⭐ Bintang 2</option><option value={0}>— (Tidak Ada / Wisata)</option></Select></div>
                        <div className="sm:col-span-2"><Label icon={IoListOutline}>Fasilitas <span className="text-gray-400 font-normal normal-case">(pisahkan dengan koma)</span></Label><Textarea rows={2} placeholder="cth: Hotel Bintang 4, Penerbangan Direct, Visa Umroh, Makan 3x/hari" value={(form.fasilitas || []).join(", ")} onChange={e => f("fasilitas", e.target.value.split(",").map((s: string) => s.trim()).filter(Boolean))} /></div>
                        <div><Label icon={IoRocketOutline}>Status Paket</Label>'''

if old_form in content:
    content = content.replace(old_form, new_form)
    print('FORM FIELDS: OK')
else:
    print('FORM FIELDS: NOT FOUND - searching...')
    # Try to find the maskapai line
    idx = content.find('IoAirplaneOutline}>Maskapai')
    print(f'  Maskapai field found at idx: {idx}')
    if idx > 0:
        print(repr(content[idx-20:idx+200]))

# Write back
with open(path, 'w', encoding='utf-8', newline='') as f:
    f.write(content.replace('\n', '\r\n'))

print('DONE')
