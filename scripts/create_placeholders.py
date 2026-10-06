from pathlib import Path

root = Path(__file__).resolve().parents[1] / 'public' / 'images'
(root / 'hero').mkdir(parents=True, exist_ok=True)
for folder in ['activities', 'camps', 'team', 'gallery', 'achievements']:
    (root / folder).mkdir(parents=True, exist_ok=True)

labels = {
    'hero.svg': ('NSS HERO PHOTO', 'TO BE ADDED'),
    'blood-donation.svg': ('BLOOD DONATION', 'PHOTO TO BE ADDED'),
    'tree-plantation.svg': ('TREE PLANTATION', 'PHOTO TO BE ADDED'),
    'winter-camp.svg': ('WINTER CAMP', 'PHOTO TO BE ADDED'),
    'police-mitra.svg': ('POLICE MITRA', 'PHOTO TO BE ADDED'),
    'awareness.svg': ('AWARENESS DRIVE', 'PHOTO TO BE ADDED'),
    'self-defence.svg': ('SELF DEFENCE', 'PHOTO TO BE ADDED'),
    'sinhgad.svg': ('CAMP PHOTO', 'TO BE ADDED'),
    'gallery/camp.svg': ('CAMP PHOTO', 'TO BE ADDED'),
    'gallery/blood-donation.svg': ('BLOOD DONATION', 'PHOTO TO BE ADDED'),
    'gallery/tree-plantation.svg': ('TREE PLANTATION', 'PHOTO TO BE ADDED'),
    'gallery/awareness.svg': ('AWARENESS DRIVE', 'PHOTO TO BE ADDED'),
    'gallery/cleanliness.svg': ('CLEANLINESS DRIVE', 'PHOTO TO BE ADDED'),
    'gallery/police-mitra.svg': ('POLICE MITRA', 'PHOTO TO BE ADDED'),
    'gallery/self-defence.svg': ('SELF DEFENCE', 'PHOTO TO BE ADDED'),
    'gallery/cultural.svg': ('CULTURAL EVENT', 'PHOTO TO BE ADDED'),
    'gallery/village.svg': ('VILLAGE DEVELOPMENT', 'PHOTO TO BE ADDED'),
    'gallery/achievement.svg': ('ACHIEVEMENT', 'PHOTO TO BE ADDED'),
    'hero/hero-main.svg': ('NSS HERO PHOTO', 'TO BE ADDED'),
    'activities/blood-donation.svg': ('BLOOD DONATION', 'TO BE ADDED'),
    'activities/tree-plantation.svg': ('TREE PLANTATION', 'TO BE ADDED'),
    'activities/awareness.svg': ('AWARENESS', 'PHOTO TO BE ADDED'),
    'camps/winter-camp.svg': ('WINTER CAMP', 'PHOTO TO BE ADDED'),
    'team/programme-officer.svg': ('PORTRAIT', 'TO BE ADDED'),
    'achievements/impact.svg': ('ACHIEVEMENT', 'PHOTO TO BE ADDED'),
}

for rel, (first, second) in labels.items():
    path = root / rel
    path.parent.mkdir(parents=True, exist_ok=True)
    svg = f'''<svg xmlns="http://www.w3.org/2000/svg" width="1600" height="1000" viewBox="0 0 1600 1000">
  <defs>
    <linearGradient id="g" x1="0" x2="1" y1="0" y2="1">
      <stop offset="0%" stop-color="#171c22"/>
      <stop offset="55%" stop-color="#2a2e34"/>
      <stop offset="100%" stop-color="#9a1e2f"/>
    </linearGradient>
  </defs>
  <rect width="1600" height="1000" fill="url(#g)"/>
  <rect x="80" y="80" width="1440" height="840" fill="none" stroke="rgba(255,255,255,0.18)" stroke-width="2"/>
  <rect x="180" y="180" width="1240" height="120" fill="rgba(255,255,255,0.04)"/>
  <text x="800" y="440" text-anchor="middle" fill="#f3efe8" font-size="48" font-family="Arial, Helvetica, sans-serif" font-weight="700" letter-spacing="8">{first}</text>
  <text x="800" y="518" text-anchor="middle" fill="#f3efe8" font-size="30" font-family="Arial, Helvetica, sans-serif" font-weight="400" letter-spacing="6">{second}</text>
  <rect x="500" y="620" width="600" height="4" fill="#b11d2e"/>
  <text x="800" y="700" text-anchor="middle" fill="rgba(255,255,255,0.8)" font-size="20" font-family="Arial, Helvetica, sans-serif" letter-spacing="8">PES MODERN COLLEGE OF ENGINEERING</text>
</svg>
'''
    path.write_text(svg, encoding='utf-8')

readme = '''# NSS image placeholders

This folder is organized for future institutional photography.
Replace the generated SVG placeholders with real NSS campus and service images in the appropriate folders.

- hero/ - hero and landing-page imagery
- activities/ - blood donation, environment, awareness, etc.
- camps/ - winter camp and field work imagery
- team/ - portraits and staff leadership photos
- gallery/ - documentary photo archive
- achievements/ - recognition and impact photography
'''
(root / 'README.md').write_text(readme, encoding='utf-8')
print('Created placeholder assets in public/images')
