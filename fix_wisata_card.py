import sys

path = r'c:\Users\Newt\Desktop\travel umroh\src\app\paket-wisata\page.tsx'

with open(path, 'r', encoding='utf-8') as f:
    content = f.read()

content = content.replace('\r\n', '\n')

start_marker = '            {/* Title */}'
end_marker = '            {/* Buttons */}'

si = content.find(start_marker)
ei = content.find(end_marker)

if si == -1 or ei == -1:
    print(f'Markers not found: si={si} ei={ei}')
    sys.exit(1)

new_block = '''            {/* Title + Info */}
            <div className="flex flex-col flex-1 p-4 gap-3">
                <h3 className="text-sm font-extrabold text-gray-900 uppercase tracking-wide leading-snug text-center">
                    {paket.nama}
                </h3>
                <div className="w-8 h-0.5 rounded-full mx-auto" style={{ backgroundColor: "#1a6fb0" }} />

                {/* Info rows */}
                <div className="flex flex-col gap-2.5">
                    <div className="flex items-center gap-2.5">
                        <span className="flex-shrink-0 w-7 h-7 rounded-lg flex items-center justify-center bg-blue-50">
                            <svg className="w-3.5 h-3.5 text-blue-700" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
                        </span>
                        <div className="flex-1 min-w-0">
                            <p className="text-[10px] text-gray-400 uppercase tracking-wide font-semibold">Jadwal</p>
                            <p className="text-xs font-bold text-gray-800 truncate">{paket.jadwal || "Sesuai Jadwal"}</p>
                        </div>
                    </div>

                    <div className="flex items-center gap-2.5">
                        <span className="flex-shrink-0 w-7 h-7 rounded-lg flex items-center justify-center bg-blue-50">
                            <svg className="w-3.5 h-3.5 text-blue-700" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                        </span>
                        <div className="flex-1 min-w-0">
                            <p className="text-[10px] text-gray-400 uppercase tracking-wide font-semibold">Durasi</p>
                            <p className="text-xs font-bold text-gray-800 truncate">{paket.durasi}</p>
                        </div>
                    </div>

                    <div className="flex items-center gap-2.5">
                        <span className="flex-shrink-0 w-7 h-7 rounded-lg flex items-center justify-center bg-blue-50">
                            <svg className="w-3.5 h-3.5 text-blue-700" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" /></svg>
                        </span>
                        <div className="flex-1 min-w-0">
                            <p className="text-[10px] text-gray-400 uppercase tracking-wide font-semibold">Berangkat Dari</p>
                            <p className="text-xs font-bold text-gray-800 truncate">{paket.kotaAsal || "Jakarta (CGK)"}</p>
                        </div>
                    </div>

                    <div className="flex items-center gap-2.5">
                        <span className="flex-shrink-0 w-7 h-7 rounded-lg flex items-center justify-center bg-blue-50">
                            <PlaneIcon className="w-3.5 h-3.5 text-blue-700" />
                        </span>
                        <div className="flex-1 min-w-0">
                            <p className="text-[10px] text-gray-400 uppercase tracking-wide font-semibold">Maskapai</p>
                            <p className="text-xs font-bold text-gray-800 leading-snug">{paket.maskapai || "Garuda / Setaraf"}</p>
                        </div>
                    </div>

                    <div className="flex items-center gap-2.5">
                        <span className="flex-shrink-0 w-7 h-7 rounded-lg flex items-center justify-center bg-blue-50">
                            <svg className="w-3.5 h-3.5 text-blue-700" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" /></svg>
                        </span>
                        <div className="flex-1 min-w-0">
                            <p className="text-[10px] text-gray-400 uppercase tracking-wide font-semibold">Hotel</p>
                            <div className="flex gap-0.5 mt-0.5">
                                {Array.from({ length: 5 }).map((_, i) => (
                                    <svg key={i} className={`w-3.5 h-3.5 ${i < (paket.hotelMekkahBintang || 4) ? "text-amber-400" : "text-gray-200"}`} fill="currentColor" viewBox="0 0 20 20">
                                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                    </svg>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            '''

result = content[:si] + new_block + content[ei:]

with open(path, 'w', encoding='utf-8', newline='') as f:
    f.write(result.replace('\n', '\r\n'))

print('SUCCESS')
