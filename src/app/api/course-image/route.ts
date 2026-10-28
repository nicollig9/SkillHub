import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const course = (searchParams.get('course') || searchParams.get('name') || '').toLowerCase();

  if (course.includes('equilibrio') || course.includes('ansiedade') || course.includes('emocional')) {
    const equilibrioPaths = [
      path.join(process.cwd(), 'public', 'mapa-mental-equilibrio.png'),
      'C:/Users/nicolisilva/.gemini/antigravity/brain/1200354b-7dc2-4b3e-b709-afb45e1bc230/mapa_mental_equilibrio_1793215124594.jpg',
      path.join(process.cwd(), 'SkillHub', 'public', 'mapa-mental-equilibrio.png')
    ];

    for (const filePath of equilibrioPaths) {
      if (fs.existsSync(filePath)) {
        try {
          const fileBuffer = fs.readFileSync(filePath);
          const ext = path.extname(filePath).toLowerCase();
          const contentType = ext === '.png' ? 'image/png' : 'image/jpeg';

          // Sincronizar para public/mapa-mental-equilibrio.png
          try {
            const publicPng = path.join(process.cwd(), 'public', 'mapa-mental-equilibrio.png');
            if (!fs.existsSync(publicPng)) {
              fs.copyFileSync(filePath, publicPng);
            }
            const subPublicPng = path.join(process.cwd(), 'SkillHub', 'public', 'mapa-mental-equilibrio.png');
            if (!fs.existsSync(subPublicPng)) {
              fs.copyFileSync(filePath, subPublicPng);
            }
          } catch {}

          return new Response(fileBuffer, {
            headers: {
              'Content-Type': contentType,
              'Cache-Control': 'public, max-age=86400'
            }
          });
        } catch (e) {
          console.error('Error reading equilibrio image:', e);
        }
      }
    }
  }

  const possiblePaths = [
    'C:/Users/nicolisilva/.gemini/antigravity/brain/1200354b-7dc2-4b3e-b709-afb45e1bc230/.user_uploaded/media_1793211821242_cb04098b.webp',
    'C:/Users/nicolisilva/.gemini/antigravity/brain/1200354b-7dc2-4b3e-b709-afb45e1bc230/.user_uploaded/media_1793211624964_f185f194.webp',
    'C:/Users/nicolisilva/.gemini/antigravity/brain/1200354b-7dc2-4b3e-b709-afb45e1bc230/.user_uploaded/media_1793209888872_c90ac620.webp',
    path.join(process.cwd(), 'public', 'mapa-mental-orcamento.png'),
    path.join(process.cwd(), 'public', 'mapa-mental-orcamento.webp'),
    'C:/Users/nicolisilva/.gemini/antigravity/brain/1200354b-7dc2-4b3e-b709-afb45e1bc230/mapa_mental_orcamento_1793046355991.jpg'
  ];

  for (const filePath of possiblePaths) {
    if (fs.existsSync(filePath)) {
      try {
        const fileBuffer = fs.readFileSync(filePath);
        const ext = path.extname(filePath).toLowerCase();
        const contentType = ext === '.webp' ? 'image/webp' : ext === '.png' ? 'image/png' : 'image/jpeg';

        // Sincronizar para public/mapa-mental-orcamento.png
        try {
          const publicPng = path.join(process.cwd(), 'public', 'mapa-mental-orcamento.png');
          if (!fs.existsSync(publicPng)) {
            fs.copyFileSync(filePath, publicPng);
          }
          const subPublicPng = path.join(process.cwd(), 'SkillHub', 'public', 'mapa-mental-orcamento.png');
          if (!fs.existsSync(subPublicPng)) {
            fs.copyFileSync(filePath, subPublicPng);
          }
        } catch {}

        return new Response(fileBuffer, {
          headers: {
            'Content-Type': contentType,
            'Cache-Control': 'public, max-age=86400'
          }
        });
      } catch (e) {
        console.error('Error reading course image:', e);
      }
    }
  }

  return NextResponse.json({ error: 'Image not found' }, { status: 404 });
}
