import os
from reportlab.lib import colors
from reportlab.lib.pagesizes import letter
from reportlab.platypus import (
    SimpleDocTemplate, Paragraph, Spacer, Table, TableStyle, HRFlowable, KeepTogether
)
from reportlab.lib.styles import getSampleStyleSheet, ParagraphStyle
from reportlab.lib.units import inch

def build_pdf():
    pdf_filename = "/Users/sg/.gemini/antigravity/brain/1775522c-2f26-4ef8-88ae-85fc9b0ebb0f/BraidBarNJ_Invoice_SGTeam_600.pdf"
    
    # Document Setup
    doc = SimpleDocTemplate(
        pdf_filename,
        pagesize=letter,
        rightMargin=40,
        leftMargin=40,
        topMargin=40,
        bottomMargin=40
    )

    story = []

    # Color Palette (Espresso, Terracotta, Nude/Cream, Gold)
    COLOR_ESPRESSO = colors.HexColor("#3C2415")
    COLOR_TERRACOTTA = colors.HexColor("#C67B5C")
    COLOR_GOLD = colors.HexColor("#C9A96E")
    COLOR_CREAM = colors.HexColor("#FAF8F5")
    COLOR_DARK_TEXT = colors.HexColor("#2B1810")
    COLOR_LIGHT_BG = colors.HexColor("#F6F2EC")
    COLOR_BORDER = colors.HexColor("#E2D8CC")
    COLOR_GREEN = colors.HexColor("#2E7D32")

    # Typography Styles
    styles = getSampleStyleSheet()

    style_title = ParagraphStyle(
        'DocTitle',
        fontName='Helvetica-Bold',
        fontSize=24,
        leading=28,
        textColor=COLOR_ESPRESSO,
        alignment=0
    )

    style_subtitle = ParagraphStyle(
        'DocSubtitle',
        fontName='Helvetica-Bold',
        fontSize=11,
        leading=15,
        textColor=COLOR_TERRACOTTA,
        alignment=0
    )

    style_inv_label = ParagraphStyle(
        'InvLabel',
        fontName='Helvetica-Bold',
        fontSize=28,
        leading=32,
        textColor=COLOR_TERRACOTTA,
        alignment=2
    )

    style_inv_meta = ParagraphStyle(
        'InvMeta',
        fontName='Helvetica',
        fontSize=9,
        leading=13,
        textColor=COLOR_DARK_TEXT,
        alignment=2
    )

    style_heading = ParagraphStyle(
        'SectionHeading',
        fontName='Helvetica-Bold',
        fontSize=10.5,
        leading=14,
        textColor=COLOR_ESPRESSO,
        spaceAfter=4
    )

    style_body = ParagraphStyle(
        'BodyText',
        fontName='Helvetica',
        fontSize=9,
        leading=13,
        textColor=COLOR_DARK_TEXT
    )

    style_body_bold = ParagraphStyle(
        'BodyTextBold',
        fontName='Helvetica-Bold',
        fontSize=9,
        leading=13,
        textColor=COLOR_DARK_TEXT
    )

    style_th = ParagraphStyle(
        'TableHeader',
        fontName='Helvetica-Bold',
        fontSize=9,
        leading=11,
        textColor=colors.white,
        alignment=0
    )
    
    style_th_right = ParagraphStyle(
        'TableHeaderRight',
        fontName='Helvetica-Bold',
        fontSize=9,
        leading=11,
        textColor=colors.white,
        alignment=2
    )

    style_td = ParagraphStyle(
        'TableCell',
        fontName='Helvetica',
        fontSize=8.5,
        leading=11,
        textColor=COLOR_DARK_TEXT
    )

    style_td_right = ParagraphStyle(
        'TableCellRight',
        fontName='Helvetica',
        fontSize=8.5,
        leading=11,
        textColor=COLOR_DARK_TEXT,
        alignment=2
    )

    style_td_total = ParagraphStyle(
        'TableCellTotal',
        fontName='Helvetica-Bold',
        fontSize=13,
        leading=16,
        textColor=COLOR_ESPRESSO,
        alignment=2
    )

    # 1. Header Table (Provider vs Invoice Metadata)
    header_left = [
        Paragraph("SG TEAM", style_title),
        Paragraph("Digital Web Engineering & Autonomous Solutions", style_subtitle),
        Spacer(1, 2),
        Paragraph("Email: <b>sgsupport@icloud.com</b> • Web: braidbarnj.com", style_body),
    ]

    header_right = [
        Paragraph("INVOICE", style_inv_label),
        Spacer(1, 4),
        Paragraph("<b>Invoice #:</b> SG-2026-089", style_inv_meta),
        Paragraph("<b>Date:</b> July 24, 2026", style_inv_meta),
        Paragraph("<b>Payment Terms:</b> Due Upon Receipt", style_inv_meta),
        Paragraph("<b>Status:</b> <font color='#2E7D32'><b>READY FOR PAYMENT</b></font>", style_inv_meta),
    ]

    header_table = Table([[header_left, header_right]], colWidths=[3.5*inch, 3.75*inch])
    header_table.setStyle(TableStyle([
        ('VALIGN', (0,0), (-1,-1), 'TOP'),
        ('LEFTPADDING', (0,0), (-1,-1), 0),
        ('RIGHTPADDING', (0,0), (-1,-1), 0),
        ('TOPPADDING', (0,0), (-1,-1), 0),
        ('BOTTOMPADDING', (0,0), (-1,-1), 0),
    ]))
    story.append(header_table)
    story.append(Spacer(1, 12))
    story.append(HRFlowable(width="100%", thickness=1.5, color=COLOR_GOLD, spaceBefore=0, spaceAfter=14))

    # 2. Client vs Remittance Information Table
    billed_to = [
        Paragraph("CLIENT / BILLED TO:", style_heading),
        Paragraph("<b>Sharon French</b>", style_body_bold),
        Paragraph("Owner & Lead Stylist", style_body),
        Paragraph("<b>The Braid Bar NJ</b> (Apple Butter Boutique)", style_body),
        Paragraph("560 Valley Road", style_body),
        Paragraph("West Orange, NJ 07052", style_body),
        Paragraph("Email: braidbar1nj@gmail.com", style_body),
        Paragraph("Phone: +1 (551) 339-3637", style_body),
    ]

    provider_info = [
        Paragraph("PAYMENT REMITTANCE DETAILS:", style_heading),
        Paragraph("<b>SG Team</b>", style_body_bold),
        Paragraph("• <b>Zelle Transfer:</b> <code>908.906.9103</code>", style_body),
        Paragraph("  (Name / Email: Kris Washington / <code>sgsupport@icloud.com</code>)", style_body),
        Spacer(1, 3),
        Paragraph("• <b>PayPal:</b> <code>kris.washington@icloud.com</code>", style_body),
        Paragraph("• <b>Support Contact:</b> <code>sgsupport@icloud.com</code>", style_body),
    ]

    addresses_table = Table([[billed_to, provider_info]], colWidths=[3.6*inch, 3.65*inch])
    addresses_table.setStyle(TableStyle([
        ('VALIGN', (0,0), (-1,-1), 'TOP'),
        ('BACKGROUND', (0,0), (-1,-1), COLOR_LIGHT_BG),
        ('PADDING', (0,0), (-1,-1), 10),
        ('BOX', (0,0), (-1,-1), 1, COLOR_BORDER),
    ]))
    story.append(addresses_table)
    story.append(Spacer(1, 16))

    # 3. Itemized Work Completed Table
    table_data = [
        [
            Paragraph("SCOPE OF WORK & DELIVERABLES COMPLETED", style_th),
            Paragraph("QTY", style_th),
            Paragraph("RATE", style_th_right),
            Paragraph("AMOUNT", style_th_right)
        ],
        [
            Paragraph(
                "<b>1. Bespoke Vogue 90's UX/UI Design & 3D WebGL Engine</b><br/>"
                "<font color='#555555'>Custom terracotta/espresso brand design, SVG wave marquee text animation, "
                "React Three Fiber 3D hair strands & satin physics hero canvas.</font>", style_td
            ),
            Paragraph("1", style_td),
            Paragraph("$175.00", style_td_right),
            Paragraph("$175.00", style_td_right),
        ],
        [
            Paragraph(
                "<b>2. VIP Protective Styling Booking Engine & Multi-Payment Checkout</b><br/>"
                "<font color='#555555'>Interactive scheduler (/book), Acuity service catalog ($400 VIP, $325 Fulani, $240 Knotless), "
                "25% deposit calculator, Stripe/Apple Pay, Cash App Pay & Zelle integrations.</font>", style_td
            ),
            Paragraph("1", style_td),
            Paragraph("$175.00", style_td_right),
            Paragraph("$175.00", style_td_right),
        ],
        [
            Paragraph(
                "<b>3. Master Real-Time CMS, Passcode Security (592) & Launch Switch</b><br/>"
                "<font color='#555555'>Owner security lock (592), real-time content/price/photo editor, Coming Soon vs Live production switch, "
                "owner preview mode, and built-in Owner Operating Manual.</font>", style_td
            ),
            Paragraph("1", style_td),
            Paragraph("$125.00", style_td_right),
            Paragraph("$125.00", style_td_right),
        ],
        [
            Paragraph(
                "<b>4. Automated Email Service (Mailgun/Resend) & WhatsApp Dispatch</b><br/>"
                "<font color='#555555'>Automated client HTML booking confirmation emails (appointments@braidbarnj.com) "
                "and 1-click WhatsApp client messaging for hair prep rules.</font>", style_td
            ),
            Paragraph("1", style_td),
            Paragraph("$75.00", style_td_right),
            Paragraph("$75.00", style_td_right),
        ],
        [
            Paragraph(
                "<b>5. DevOps, GoDaddy Domain DNS & Vercel SSL Production Deployment</b><br/>"
                "<font color='#555555'>GoDaddy DNS routing (braidbarnj.com), DigiCert SSL security setup, "
                "GitHub repository version control, and live production deployment.</font>", style_td
            ),
            Paragraph("1", style_td),
            Paragraph("$50.00", style_td_right),
            Paragraph("$50.00", style_td_right),
        ],
    ]

    items_table = Table(table_data, colWidths=[4.35*inch, 0.5*inch, 1.2*inch, 1.2*inch])
    items_table.setStyle(TableStyle([
        ('BACKGROUND', (0,0), (-1,0), COLOR_ESPRESSO),
        ('ALIGN', (0,0), (-1,0), 'LEFT'),
        ('VALIGN', (0,0), (-1,-1), 'MIDDLE'),
        ('PADDING', (0,0), (-1,-1), 7),
        ('GRID', (0,0), (-1,-1), 0.5, COLOR_BORDER),
        ('ROWBACKGROUNDS', (0,1), (-1,-1), [colors.white, COLOR_CREAM]),
    ]))
    story.append(items_table)
    story.append(Spacer(1, 12))

    # 4. Total Calculation Table
    summary_data = [
        [
            Paragraph("<font size=11><b>TOTAL AMOUNT DUE:</b></font>", style_heading),
            Paragraph("<b>$600.00 USD</b>", style_td_total)
        ],
    ]

    summary_table = Table(summary_data, colWidths=[5.25*inch, 2.0*inch])
    summary_table.setStyle(TableStyle([
        ('VALIGN', (0,0), (-1,-1), 'MIDDLE'),
        ('PADDING', (0,0), (-1,-1), 8),
        ('ALIGN', (1,0), (1,-1), 'RIGHT'),
        ('BACKGROUND', (0,0), (-1,-1), COLOR_LIGHT_BG),
        ('BOX', (0,0), (-1,-1), 1.5, COLOR_TERRACOTTA),
    ]))
    
    wrapper_table = Table([[Paragraph("", style_body), summary_table]], colWidths=[0.0*inch, 7.25*inch])
    wrapper_table.setStyle(TableStyle([
        ('LEFTPADDING', (0,0), (-1,-1), 0),
        ('RIGHTPADDING', (0,0), (-1,-1), 0),
    ]))
    story.append(wrapper_table)
    story.append(Spacer(1, 16))

    # 5. Payment Remittance Box & Notes
    payment_notes = [
        Paragraph("<b>PAYMENT REMITTANCE INSTRUCTIONS</b>", style_heading),
        Spacer(1, 3),
        Paragraph("Please send payment of <b>$600.00 USD</b> using either of the following methods:", style_body),
        Spacer(1, 4),
        Paragraph("1. <b>Zelle Direct Transfer (Instant — No Fee):</b><br/>"
                  "• Send to Phone: <b>908.906.9103</b><br/>"
                  "• Name / Email: Kris Washington (<code>sgsupport@icloud.com</code>)", style_body),
        Spacer(1, 4),
        Paragraph("2. <b>PayPal Transfer:</b><br/>"
                  "• Send to PayPal Email: <b>kris.washington@icloud.com</b>", style_body),
        Spacer(1, 6),
        Paragraph("<i>Thank you for your business, Sharon! SG Team is honored to partner with The Braid Bar NJ.</i>", style_body),
    ]

    notes_table = Table([[payment_notes]], colWidths=[7.25*inch])
    notes_table.setStyle(TableStyle([
        ('BACKGROUND', (0,0), (-1,-1), COLOR_CREAM),
        ('PADDING', (0,0), (-1,-1), 10),
        ('BOX', (0,0), (-1,-1), 1, COLOR_GOLD),
    ]))
    story.append(KeepTogether(notes_table))

    # Build PDF Document
    doc.build(story)
    print(f"PDF successfully generated at: {pdf_filename}")

if __name__ == "__main__":
    build_pdf()
