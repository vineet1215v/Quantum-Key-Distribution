from reportlab.platypus import SimpleDocTemplate, Paragraph, Spacer, PageBreak, Image
from reportlab.lib.styles import getSampleStyleSheet, ParagraphStyle
from reportlab.lib.units import inch
from reportlab.lib.pagesizes import letter
from reportlab.lib.colors import navy, black
import os

def create_presentation(content_file, output_file):
    """Generates a PDF presentation from a markdown file."""
    styles = getSampleStyleSheet()
    styles.add(ParagraphStyle(name='MyTitle', parent=styles['h1'], fontName='Helvetica-Bold', fontSize=36, spaceAfter=18, textColor=navy))
    styles.add(ParagraphStyle(name='MyBody', parent=styles['Normal'], fontName='Helvetica', fontSize=14, leading=18, spaceAfter=12))

    doc = SimpleDocTemplate(output_file, pagesize=letter)
    story = []

    with open(content_file, 'r') as f:
        content = f.read()

    slides = content.split('---\n')

    for slide_content in slides:
        if not slide_content.strip():
            continue

        lines = slide_content.strip().split('\n')
        title = lines[0].replace('# ', '').strip()
        body = '\n'.join(lines[1:]).strip()

        story.append(Paragraph(title, styles['MyTitle']))
        story.append(Spacer(1, 0.25 * inch))

        for item in body.split('\n'):
            item = item.strip()
            if not item:
                continue

            if item.startswith('- '):
                story.append(Paragraph(f'• {item[2:]}', styles['MyBody']))
                story.append(Spacer(1, 0.1 * inch))
            elif item.lower().endswith( '.png') and os.path.exists(item):
                img = Image(item, width=5*inch, height=3*inch)
                story.append(img)
                story.append(Spacer(1, 0.2 * inch))

        story.append(PageBreak())

    doc.build(story)

if __name__ == '__main__':
    # Add image paths to the content file
    with open('presentation_content.md', 'a') as f:
        f.write('\narchitecture.png\n')
        f.write('bb84_flow.png\n')

    create_presentation('presentation_content.md', 'AQVH2025_Presentation.pdf')
    print('Successfully generated AQVH2025_Presentation.pdf')