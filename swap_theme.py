import os

token_replacements = [
    # Exact colors
    ('#080808', '#ffffff'),
    ('#ffffff', '#080808'),
    
    # Prefix Backgrounds
    ('bg-[#080808]', 'bg-white'),
    ('bg-slate-900', 'bg-white'),
    ('bg-slate-50', 'bg-white/[0.02]'),
    ('bg-slate-100', 'bg-white/[0.04]'),
    ('bg-white/[0.02]', 'bg-slate-50'),
    ('bg-white/[0.04]', 'bg-slate-100'),
    ('bg-white/5', 'bg-slate-900/50'),
    ('bg-white/10', 'bg-slate-200'),
    ('bg-black/80', 'bg-white/80'),
    ('bg-slate-900/50', 'bg-white/50'),
    ('bg-black', 'bg-white'),
    ('bg-white', 'bg-[#080808]'),
    
    # Text colors
    ('text-white/80', 'text-slate-800'),
    ('text-slate-800', 'text-white/80'),
    ('text-white/70', 'text-slate-700'),
    ('text-slate-700', 'text-white/70'),
    ('text-white/60', 'text-slate-600'),
    ('text-slate-600', 'text-white/60'),
    ('text-white/50', 'text-slate-500'),
    ('text-slate-500', 'text-white/50'),
    ('text-white/40', 'text-slate-500'),
    ('text-slate-400', 'text-white/40'),
    ('text-white/30', 'text-slate-300'),
    ('text-slate-300', 'text-white/30'),
    ('text-white/20', 'text-slate-200'),
    ('text-slate-200', 'text-white/20'),
    ('text-slate-900', 'text-white'),
    ('text-black', 'text-white'),
    ('text-white', 'text-slate-900'),

    # Borders
    ('border-slate-100', 'border-white/10'),
    ('border-white/10', 'border-slate-100'),
    ('border-slate-200', 'border-white/20'),
    ('border-white/20', 'border-slate-200'),
    ('border-slate-300', 'border-white/30'),
    ('border-white/30', 'border-slate-300'),
    ('border-white/[0.05]', 'border-black/[0.05]'),
    ('border-white/[0.06]', 'border-black/[0.06]'),
    ('border-white/[0.07]', 'border-black/[0.07]'),

    # Rings
    ('ring-slate-900/5', 'ring-white/10'),
    ('ring-white/10', 'ring-slate-900/5'),
    ('ring-white/5', 'ring-slate-900/5'),
    
    # RGB Asymmetries
    ('rgba(255,255,255,', 'rgba(0,0,0,'),
    ('rgba(0,0,0,', 'rgba(255,255,255,'),

    # States
    ('hover:text-white', 'hover:text-slate-900'),
    ('group-hover:text-white', 'group-hover:text-slate-900'),
    ('group-hover:text-slate-900', 'group-hover:text-white'),
    ('group-hover:border-slate-900', 'group-hover:border-white'),
    ('group-hover:border-white', 'group-hover:border-slate-900'),
    ('hover:bg-slate-50', 'hover:bg-white/5'),
    ('hover:bg-white/90', 'hover:bg-slate-900/90'),
    ('hover:bg-white/[0.08]', 'hover:bg-slate-200'),
    ('group-hover:bg-slate-900', 'group-hover:bg-white'),
    ('group-hover:bg-white', 'group-hover:bg-slate-900'),
]

token_replacements.sort(key=lambda x: len(x[0]), reverse=True)

def perform_swaps(filepath):
    with open(filepath, 'r') as f:
        content = f.read()
    
    original_content = content
    placeholders = []
    
    for i, (src, dst) in enumerate(token_replacements):
        ph = f"___PLACEHOLDER_{i}___"
        placeholders.append((ph, dst))
        content = content.replace(src, ph)
        
    for ph, dst in placeholders:
        content = content.replace(ph, dst)
        
    if content != original_content:
        with open(filepath, 'w') as f:
            f.write(content)
        print(f"Updated {filepath}")

for root, dirs, files in os.walk('src'):
    for file in files:
        if file.endswith('.jsx') or file.endswith('.css'):
            perform_swaps(os.path.join(root, file))
