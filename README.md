# Fluff Cakes — SPM Project (SYE3104)

Practical examination submission for **SYE3104: Software Project Management**, Uganda Christian University — Advent 2026.

The project plans, executes and closes a **4-page static informational website for Fluff Cakes**, a bakery sponsor, over a 14-day baseline (14–27 November 2026).

## Deliverables

| # | File | Part | Content |
|---|------|------|---------|
| 01 | `01_Lecturer_Approval_Message.docx` | — | Scope pitch and written lecturer approval |
| 02 | `02_Fluff_Cakes_Project_Charter.docx` | A | Objectives, scope, success criteria, authority |
| 03 | `03_Part_B_Fluff_Cakes_Stakeholder_Register_and_Plan.docx` | B | Stakeholder register, power/interest grid, engagement plan |
| 04 | `04_Part_C_Deliverable_WBS.docx` | C | Deliverable-based WBS, 8 work packages, dictionary |
| 05 | `05_Part_C_Schedule_and_Budget.xlsx` | C, F | Linked Gantt schedule, itemised budget, milestones |
| 06 | `06_Part_D_Risk_Comms_and_Quality.docx` | D | Risk register, communication and quality plans |
| 07 | `07_Part_E_Execution_Updates_and_Logs.docx` | E | Progress updates, issue log, change control |
| 08 | `08_Part_F_Project_Closure_Package.docx` | F | Closure report, lessons learned, budget reconciliation |
| 09 | `09_Part_G_Defense_Prep_Guide.docx` | G | Defense questions, answers, evidence map |
| 10 | `10_SYE3104_Master_Practical_Report.docx` | A–G | Consolidated submission report |

`Fluff_Cakes_Project_Tracker.html` is an interactive single-page tracker for the same deliverables.

## Baseline figures

- **Critical path:** T01 → T02 → T03 → T05 → T07 → T08 → T10 → T11 → T12 = 14 days, zero float
- **Budget:** UGX 18,000 base cost + 15% contingency = **UGX 21,000** authorised ceiling
- **Milestones:** M1 academic scope approved · M2 planning baseline v1.0 · M3 wireframes complete · M4 QA & peer UAT passed · M5 formal closure

## Repository layout

```
├── 01–10 documents            # deliverable set
├── Fluff_Cakes_Project_Tracker.html
├── Evidence/                  # verification artefacts (approvals, QA, UAT)
├── website/                   # the delivered website (Vite + React)
└── uploads/                   # supporting reference material
```

## Website

```bash
cd website
npm install
npm run dev      # local development
npm run build    # production build
```

## Evidence

The WBS acceptance criteria require written artefacts, not just documents. Before the defense, `Evidence/` should hold:

- lecturer approval (screenshot or email export)
- signed project charter
- sponsor content confirmation
- wireframes at 360px and 1280px
- broken-link and viewport QA results
- at least three peer UAT responses
- signed sponsor acceptance
