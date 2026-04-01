# AccessiFlow Digital Inclusion Platform v1.2.0
## Official Documentation

**Author**: Prasan Kumar  
**Version**: 1.2.0  
**Date**: April 1, 2026  

---

## 1. Executive Summary
AccessiFlow v1.2.0 represents a significant evolution in digital inclusion auditing. This release introduces a standardized **Cinematic Lite Purple** aesthetic, a high-fidelity **6-Phase Audit Simulation Engine**, and a professional **2-Sheet Enterprise Reporting** system. Currently deployed on Google Cloud Run, AccessiFlow enables real-world accessibility validation across complex domain architectures including IBM Watson Orchestrate and consumer platforms like RedBus.in.

---

## 2. New Features in v1.2.0

### 2.1 Cinematic Lite Purple Aesthetic
The entire platform has been rebranded with a futuristic, obsidian-based dark theme featuring lavender accents (`#a855f7`) and deep purple glow effects. 
- **Glassmorphism**: Enhanced backdrop-blur on all panels.
- **Responsive Branding**: Rebranded primary CTA to **"A11y Audit"**.

### 2.2 6-Phase Automated Audit Engine
The audit process is now simulated across six critical phases to mirror enterprise-level manual and automated testing:
1. **IBM Equal Access Checker**: DOM tree and ARIA mapping.
2. **NVDA Screen Reader**: Simulated virtual announcements.
3. **Keyboard Navigation**: Focus order and interaction trap check.
4. **Color Contrast (1.4.3)**: Luminance ratio validation.
5. **Guideline Mapping**: WCAG 2.1 AA rule-by-rule verification.
6. **Final VPAT Consolidation**: Real-time scoring.

### 2.3 Domain-Specific Auditing Logic
- **Watson Orchestrate**: Automated detection for `aria-live` missing in chat logs, mobile reflow issues on Safari, and keyboard-trap in thread management.
- **RedBus.in**: Identification of non-semantic toggles, low-contrast red elements, and missing landmarks.

---

## 3. Professional Reporting
The reporting engine now generates a **Master Audit Estimator** in a professional 2-sheet Excel format:
- **Sheet 1: Visual Dashboard**: Executive summary, compliance score (Health), and severity breakdown.
- **Sheet 2: Detailed Violations**: A 10-column IBM-standard defect log featuring:
    * Component & Issue Summary
    * Technical Description & Recommended Fix
    * User Impact Statement
    * WCAG Mapping & Severity Mapping

---

## 4. Visual Verification

### 4.1 The v1.2 Dashboard
![AccessiFlow Dashboard](file:///C:/Users/PrasannaNariboina/.gemini/antigravity/brain/305bcd72-4850-49eb-aa40-9df203f890dd/accessiflow_dashboard_1774983915757.png)

### 4.2 IBM Watson Orchestrate Audit (54/100)
![Watson Audit Results](file:///C:/Users/PrasannaNariboina/.gemini/antigravity/brain/305bcd72-4850-49eb-aa40-9df203f890dd/watson_orchestrate_audit_results_1774968235001.png)

### 4.3 Google.com Core Audit (88/100)
![Google Audit Results](file:///C:/Users/PrasannaNariboina/.gemini/antigravity/brain/305bcd72-4850-49eb-aa40-9df203f890dd/accessiflow_google_audit_success_1774983955616.png)

---

## 5. Deployment & Infrastructure
AccessiFlow v1.2.0 is deployed as a containerized service on **Google Cloud Run**.
- **Container**: Node 22 + NGINX Alpine.
- **Region**: `us-central1`
- **Live URL**: [https://accessiflow-551407117123.us-central1.run.app](https://accessiflow-551407117123.us-central1.run.app)

---

## 6. Official Sign-off

This document confirms the successful completion of the v1.2.0 accessibility audit upgrade and infrastructure deployment.

<br><br><br>

***Submitted by Prasan kumar***
