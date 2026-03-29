const { mdToPdf } = require('md-to-pdf');
const fs = require('fs');

(async () => {
    try {
        console.log("Reading Markdown...");
        const mdContent = fs.readFileSync('AccessiFlow_KT_Walkthrough.md', 'utf-8');
        
        console.log("Generating PDF (this might take a few seconds)...");
        // Convert to PDF
        const pdf = await mdToPdf({ content: mdContent }).catch(console.error);
        
        if (pdf) {
            fs.writeFileSync('AccessiFlow_KT_Documentation.pdf', pdf.content);
            console.log("PDF Created successfully: AccessiFlow_KT_Documentation.pdf");
        }
    } catch (e) {
        console.error("Failed to generate:", e);
    }
})();
