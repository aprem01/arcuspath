// =============================================================================
// ARCUSPATH 360 - EDUCATION CONTENT
// Practical guides and checklists to help LGBTQIA+ community navigate services
// =============================================================================

import { EducationTopic, ChecklistItem } from "@/lib/types";

// -----------------------------------------------------------------------------
// EDUCATION TOPICS
// -----------------------------------------------------------------------------

export const educationTopics: EducationTopic[] = [
  // HEALTHCARE TOPICS
  {
    id: "finding-affirming-healthcare",
    slug: "finding-affirming-healthcare",
    title: "Finding LGBTQIA+ Affirming Healthcare",
    description:
      "A comprehensive guide to finding healthcare providers who understand and respect your identity.",
    category: "healthcare",
    content: `
## Why Affirming Healthcare Matters

Finding a healthcare provider who understands LGBTQIA+ health needs isn't just about comfort—it's about receiving accurate, complete medical care. Studies show that patients with affirming providers are more likely to seek preventive care, disclose important health information, and have better health outcomes.

## What to Look For

### Signs of an Affirming Practice

- **Intake forms** that include options for chosen name, pronouns, and gender identity
- **Staff training** on LGBTQIA+ cultural competency
- **Visual indicators** like Pride flags or inclusive signage
- **Knowledge** of specific health needs (hormone therapy, PrEP, etc.)
- **Non-judgmental communication** about sexual health and relationships

### Red Flags to Watch For

- Repeatedly using wrong pronouns or name after correction
- Asking invasive questions unrelated to your visit
- Making assumptions about your relationships or sexual behavior
- Refusing to provide gender-affirming care or referrals
- Staff seeming uncomfortable or unprepared

## Questions to Ask

Before your first appointment, consider calling or emailing to ask:

1. "Does your practice have experience with LGBTQIA+ patients?"
2. "What training has your staff received on inclusive care?"
3. "Can I use my chosen name in your system?"
4. "Do you provide [specific service] or can you refer me to someone who does?"

## Your Rights

- You have the right to respectful care regardless of your identity
- You can request a different provider within a practice
- You can file complaints with state medical boards for discrimination
- HIPAA protections cover your gender identity and sexual orientation

## Making the Most of Your Visit

- Bring a list of medications and health concerns
- Consider bringing a supportive friend or partner
- Remember: you can always leave if you feel unsafe
- Document any discriminatory behavior
    `,
    checklist: [
      {
        id: "hc-1",
        text: "Research providers before your visit",
        description: "Check reviews, ask community members, look for visible signs of inclusivity",
        resources: [
          { label: "Find providers on ArcusPath", url: "/search?category=healthcare" },
        ],
      },
      {
        id: "hc-2",
        text: "Prepare your questions ahead of time",
        description: "Write down what you want to discuss and any concerns you have",
      },
      {
        id: "hc-3",
        text: "Know your rights",
        description: "Familiarize yourself with healthcare discrimination laws in your state",
      },
      {
        id: "hc-4",
        text: "Have a backup plan",
        description: "Know other options if the visit doesn't go well",
      },
      {
        id: "hc-5",
        text: "Document your experience",
        description: "Note what went well and any concerns for future reference",
      },
    ],
    relatedTopics: ["mental-health-support", "gender-affirming-care"],
    relatedCategories: ["healthcare"],
    readTime: 8,
    lastUpdated: "2025-01-15",
  },
  {
    id: "mental-health-support",
    slug: "mental-health-support",
    title: "Finding LGBTQIA+ Affirming Mental Health Support",
    description:
      "Navigate the process of finding a therapist or counselor who truly understands your experiences.",
    category: "healthcare",
    content: `
## The Importance of Affirming Mental Healthcare

Mental health support is deeply personal. For LGBTQIA+ individuals, working with someone who understands the unique stressors of minority stress, coming out, family rejection, and identity development can make the difference between therapy that heals and therapy that harms.

## Types of Mental Health Providers

### Understanding Your Options

- **Psychiatrists (MD/DO)**: Can prescribe medication, diagnose conditions
- **Psychologists (PhD/PsyD)**: Advanced training in assessment and therapy
- **Licensed Clinical Social Workers (LCSW)**: Therapy with focus on social systems
- **Licensed Professional Counselors (LPC)**: General counseling and therapy
- **Marriage and Family Therapists (MFT)**: Relationship and family-focused

## What Makes a Therapist "Affirming"?

True affirmation goes beyond tolerance:

- **Knowledgeable** about LGBTQIA+ issues without you having to educate them
- **Uses correct pronouns and name** consistently
- **Doesn't pathologize** your identity or orientation
- **Understands minority stress** and its impact on mental health
- **Has relevant training** or supervision experience
- **Maintains appropriate boundaries** while being warm and supportive

## Questions for Potential Therapists

Ask during a consultation call:

1. "What experience do you have working with LGBTQIA+ clients?"
2. "How do you approach [specific issue: coming out, gender dysphoria, etc.]?"
3. "What is your theoretical approach to therapy?"
4. "How do you handle situations where a client's values differ from your own?"

## Accessing Affordable Care

- **Sliding scale**: Many therapists adjust fees based on income
- **Community mental health centers**: Often offer reduced-cost services
- **Training clinics**: Graduate students supervised by licensed professionals
- **Online therapy**: May be more affordable and accessible
- **Employee Assistance Programs**: Check if your employer offers free sessions

## Warning Signs

Consider finding a new therapist if they:

- Try to change your orientation or gender identity
- Focus excessively on your LGBTQIA+ identity when it's not relevant
- Break confidentiality inappropriately
- Make you feel judged or misunderstood consistently
- Lack basic knowledge about LGBTQIA+ experiences
    `,
    checklist: [
      {
        id: "mh-1",
        text: "Identify what you need from therapy",
        description: "Are you seeking support for a specific issue or general mental wellness?",
      },
      {
        id: "mh-2",
        text: "Research potential therapists",
        description: "Look for LGBTQIA+ affirming providers in your area or online",
        resources: [
          { label: "Find mental health providers", url: "/search?category=healthcare&subcategory=therapy" },
        ],
      },
      {
        id: "mh-3",
        text: "Schedule consultation calls",
        description: "Most therapists offer free 15-minute consultations to assess fit",
      },
      {
        id: "mh-4",
        text: "Verify insurance coverage or payment options",
        description: "Check if they accept your insurance or offer sliding scale fees",
      },
      {
        id: "mh-5",
        text: "Give it a few sessions",
        description: "It often takes 3-4 sessions to know if a therapist is right for you",
      },
    ],
    relatedTopics: ["finding-affirming-healthcare", "coming-out-safely"],
    relatedCategories: ["healthcare"],
    readTime: 10,
    lastUpdated: "2025-01-15",
  },
  {
    id: "gender-affirming-care",
    slug: "gender-affirming-care",
    title: "Navigating Gender-Affirming Care",
    description:
      "A practical guide to understanding and accessing gender-affirming healthcare services.",
    category: "healthcare",
    content: `
## Understanding Gender-Affirming Care

Gender-affirming care encompasses a range of medical services that support transgender, nonbinary, and gender-diverse individuals in aligning their physical presentation with their gender identity.

## Types of Gender-Affirming Care

### Medical Interventions

- **Hormone Therapy**: Testosterone or estrogen/anti-androgens
- **Puberty Blockers**: For adolescents (reversible)
- **Surgical Procedures**: Various gender-affirming surgeries

### Non-Medical Support

- **Mental health support**: Not required but often helpful
- **Voice training**: Speech therapy for voice modification
- **Hair removal**: Electrolysis or laser treatments

## The Process: What to Expect

### Informed Consent Model

Many providers now use informed consent:
- No mental health letters required
- Discuss risks, benefits, and alternatives
- Make your own informed decision about your care

### Traditional Model

Some providers may require:
- Mental health evaluation
- Letters of support from therapists
- "Real-life experience" (increasingly rare)

## Finding Providers

Look for:
- Providers explicitly listing gender-affirming care
- Endocrinologists or primary care with trans experience
- Surgeons with documented experience and results
- Staff who use correct names and pronouns

## Insurance and Cost

### Coverage Tips

- Check your policy's exclusions carefully
- Many states mandate trans healthcare coverage
- Appeal denials—they're often overturned
- Document medical necessity thoroughly

### Without Insurance

- Informed consent clinics often have sliding scales
- Some manufacturers offer patient assistance programs
- Community organizations may offer grants
- GoodRx and similar services can reduce medication costs

## Your Rights

- Healthcare discrimination based on gender identity is illegal in many states
- You can file complaints with state insurance commissioners
- WPATH Standards of Care are guidelines, not requirements
    `,
    checklist: [
      {
        id: "gac-1",
        text: "Understand your options",
        description: "Research different types of gender-affirming care available",
      },
      {
        id: "gac-2",
        text: "Find an affirming provider",
        description: "Look for providers experienced in gender-affirming care",
        resources: [
          { label: "Find gender-affirming providers", url: "/search?tags=gender-affirming-care" },
        ],
      },
      {
        id: "gac-3",
        text: "Check your insurance coverage",
        description: "Review your policy and understand what's covered",
      },
      {
        id: "gac-4",
        text: "Gather necessary documentation",
        description: "Prepare any records or letters that might be needed",
      },
      {
        id: "gac-5",
        text: "Plan for ongoing care",
        description: "Gender-affirming care often requires regular follow-ups and monitoring",
      },
    ],
    relatedTopics: ["finding-affirming-healthcare", "legal-name-gender-change"],
    relatedCategories: ["healthcare", "legal"],
    readTime: 12,
    lastUpdated: "2025-01-15",
  },

  // LEGAL TOPICS
  {
    id: "legal-name-gender-change",
    slug: "legal-name-gender-change",
    title: "Changing Your Legal Name and Gender Marker",
    description:
      "Step-by-step guidance on updating your legal documents to reflect your identity.",
    category: "legal",
    content: `
## Overview

Changing your legal name and/or gender marker can be an important step in living authentically. While the process varies by state, this guide provides a general framework to help you navigate the system.

## Name Changes

### General Process

1. **File a petition** with your local court
2. **Pay filing fees** (fee waivers available based on income)
3. **Publish notice** (required in some states, with exceptions)
4. **Attend hearing** (not always required)
5. **Receive court order** granting name change
6. **Update documents** with the court order

### Documents to Update

After receiving your court order:

- Social Security card (do this first)
- Driver's license/state ID
- Passport
- Bank accounts
- Credit cards
- Employment records
- School records
- Medical records
- Insurance policies
- Voter registration

## Gender Marker Changes

### ID Documents

Requirements vary widely:

- **Driver's License**: Check your state's requirements—some require surgery, others accept a doctor's letter or self-certification
- **Passport**: Requires a medical certification letter (no surgery required)
- **Social Security**: Will update gender marker (not displayed on card, but in records)
- **Birth Certificate**: Varies significantly by state; some allow changes, others don't

### Non-Binary Options

- Growing number of states offer "X" gender markers
- Federal documents (passport) now offer "X" option
- Check your state's current policies

## Costs and Financial Help

### Typical Costs

- Court filing fees: $100-400
- Publishing notice: $0-300
- New IDs: $30-150 each
- Certified copies: $5-25 each

### Reducing Costs

- Fee waivers for low-income petitioners
- Legal aid organizations often help for free
- Some nonprofits provide grants
- Trans legal organizations may provide assistance

## Safety Considerations

- Sealed records may be available if safety is a concern
- Publication waivers often available for trans individuals
- Consider timing relative to other life changes
    `,
    checklist: [
      {
        id: "lnc-1",
        text: "Research your state's requirements",
        description: "Each state has different processes and requirements",
      },
      {
        id: "lnc-2",
        text: "Gather required documents",
        description: "Birth certificate, ID, proof of residency, etc.",
      },
      {
        id: "lnc-3",
        text: "File court petition",
        description: "Submit your paperwork to the appropriate court",
      },
      {
        id: "lnc-4",
        text: "Update Social Security first",
        description: "This makes updating other documents easier",
      },
      {
        id: "lnc-5",
        text: "Update remaining documents systematically",
        description: "Work through your list of documents to update",
        resources: [
          { label: "Find legal help", url: "/search?category=legal" },
        ],
      },
    ],
    relatedTopics: ["finding-lgbtq-attorney", "gender-affirming-care"],
    relatedCategories: ["legal"],
    readTime: 10,
    lastUpdated: "2025-01-15",
  },
  {
    id: "finding-lgbtq-attorney",
    slug: "finding-lgbtq-attorney",
    title: "Finding an LGBTQIA+ Friendly Attorney",
    description:
      "How to find legal representation that understands and respects your identity and needs.",
    category: "legal",
    content: `
## Why It Matters

Legal issues often intersect with personal identity. Whether you're facing discrimination, navigating family law, planning your estate, or starting a business, having an attorney who understands LGBTQIA+ issues can significantly impact your case.

## Common Legal Needs

### Family Law
- Marriage and divorce
- Adoption and parenting rights
- Custody agreements
- Domestic partnerships

### Employment Law
- Workplace discrimination
- Wrongful termination
- Harassment claims
- Benefits issues

### Estate Planning
- Wills and trusts
- Healthcare directives
- Power of attorney
- Protecting chosen family

### Other Areas
- Immigration (especially same-sex couples)
- Housing discrimination
- Name and gender marker changes
- Civil rights violations

## Finding the Right Attorney

### Where to Look

- LGBTQIA+ legal organizations
- Local bar association LGBTQ sections
- Community referrals
- ArcusPath verified providers

### Questions to Ask

1. "What experience do you have with LGBTQIA+ clients?"
2. "Have you handled cases similar to mine?"
3. "What is your approach to [specific issue]?"
4. "What are your fees and payment options?"
5. "Who else in your firm might work on my case?"

### Red Flags

- Unfamiliarity with relevant laws protecting LGBTQIA+ people
- Asking inappropriate personal questions
- Misgendering or using wrong name
- Seeming uncomfortable with your identity
- Not taking your concerns seriously

## Cost Considerations

### Fee Structures
- **Hourly rates**: Common for ongoing matters
- **Flat fees**: Often used for specific services (name change, will)
- **Contingency**: Used for discrimination cases (no win, no fee)
- **Pro bono**: Free services for qualifying individuals

### Finding Affordable Help
- Legal aid societies
- Law school clinics
- LGBTQ legal organizations
- Sliding scale arrangements
    `,
    checklist: [
      {
        id: "att-1",
        text: "Identify your legal need",
        description: "What type of legal help do you need?",
      },
      {
        id: "att-2",
        text: "Research potential attorneys",
        description: "Look for experience with LGBTQIA+ clients and your type of case",
        resources: [
          { label: "Find LGBTQIA+ friendly attorneys", url: "/search?category=legal" },
        ],
      },
      {
        id: "att-3",
        text: "Schedule consultations",
        description: "Many attorneys offer free initial consultations",
      },
      {
        id: "att-4",
        text: "Prepare your questions",
        description: "Have specific questions ready about experience and approach",
      },
      {
        id: "att-5",
        text: "Review fee agreements carefully",
        description: "Understand all costs before signing anything",
      },
    ],
    relatedTopics: ["legal-name-gender-change", "workplace-rights"],
    relatedCategories: ["legal"],
    readTime: 8,
    lastUpdated: "2025-01-15",
  },

  // FINANCIAL TOPICS
  {
    id: "financial-planning-lgbtq",
    slug: "financial-planning-lgbtq",
    title: "Financial Planning for LGBTQIA+ Individuals and Families",
    description:
      "Unique financial considerations and strategies for LGBTQIA+ people.",
    category: "financial",
    content: `
## Why LGBTQIA+ Financial Planning Is Different

While basic financial principles apply to everyone, LGBTQIA+ individuals and families often face unique challenges and considerations that require specialized knowledge.

## Unique Considerations

### Relationship Recognition
- State vs. federal recognition differences
- Domestic partnership considerations
- International recognition issues
- Protecting non-legally-recognized relationships

### Family Building Costs
- Adoption expenses ($20,000-50,000+)
- Surrogacy costs ($100,000-200,000+)
- Fertility treatments
- Legal fees for parental rights

### Career Considerations
- Potential income gaps due to discrimination
- Career changes related to transition
- Geographic considerations for safety
- Industry variations in acceptance

### Healthcare Costs
- Gender-affirming care
- Mental health support
- HIV/AIDS prevention and treatment
- Insurance coverage gaps

## Building Financial Security

### Emergency Fund
- Especially important due to family estrangement risks
- Aim for 3-6 months of expenses
- Consider additional buffer for unexpected costs

### Retirement Planning
- Don't assume Social Security spousal benefits
- Understand your employer's benefits fully
- Consider tax implications of your relationship status

### Insurance
- Review life insurance beneficiary designations
- Ensure disability insurance covers your needs
- Understand health insurance options
- Consider long-term care insurance

### Estate Planning
- Essential for protecting chosen family
- Update beneficiaries on all accounts
- Consider trusts for complex situations
- Healthcare directives are critical

## Finding an Affirming Financial Advisor

Look for:
- Knowledge of LGBTQIA+ specific issues
- Experience with non-traditional families
- Understanding of your complete financial picture
- Judgment-free approach to your goals
    `,
    checklist: [
      {
        id: "fin-1",
        text: "Assess your current financial situation",
        description: "Understand your income, expenses, assets, and debts",
      },
      {
        id: "fin-2",
        text: "Build an emergency fund",
        description: "Aim for 3-6 months of expenses in accessible savings",
      },
      {
        id: "fin-3",
        text: "Review insurance coverage",
        description: "Ensure you're protected and beneficiaries are up to date",
      },
      {
        id: "fin-4",
        text: "Create or update estate planning documents",
        description: "Protect yourself and your loved ones with proper documentation",
      },
      {
        id: "fin-5",
        text: "Find an affirming financial advisor",
        description: "Get professional help for complex planning",
        resources: [
          { label: "Find financial advisors", url: "/search?category=financial" },
        ],
      },
    ],
    relatedTopics: ["finding-lgbtq-attorney"],
    relatedCategories: ["financial", "legal"],
    readTime: 10,
    lastUpdated: "2025-01-15",
  },

  // CAREER TOPICS
  {
    id: "workplace-rights",
    slug: "workplace-rights",
    title: "Understanding Your Workplace Rights as an LGBTQIA+ Employee",
    description:
      "Know your rights and how to navigate workplace challenges.",
    category: "career",
    content: `
## Federal Protections

### Title VII and the Bostock Decision

In 2020, the Supreme Court ruled in Bostock v. Clayton County that Title VII's prohibition on sex discrimination includes discrimination based on sexual orientation and gender identity. This means:

- You cannot be fired for being LGBTQIA+
- You cannot be denied a job because of your identity
- You cannot be harassed based on your sexual orientation or gender identity
- These protections apply to employers with 15+ employees

## State and Local Protections

Many states and cities have additional protections:
- Some cover smaller employers
- Some explicitly include gender identity and expression
- Some have stronger remedies
- Check your state and local laws

## Common Workplace Issues

### Discrimination
- Hiring and firing decisions
- Promotion and advancement
- Pay and benefits
- Job assignments

### Harassment
- Hostile work environment
- Unwelcome comments or behavior
- Misgendering and deadnaming
- Exclusion from work activities

### Benefits
- Same-sex spouse coverage
- Domestic partner benefits
- Gender-affirming care coverage
- Family and medical leave

## What to Do If You Face Discrimination

### Document Everything
- Keep records of incidents
- Save emails and messages
- Note witnesses
- Track dates and times

### Report Internally
- Follow your company's complaint procedure
- Put complaints in writing
- Keep copies of everything

### File External Complaints
- EEOC (federal)
- State civil rights agency
- Local human rights commission

### Seek Legal Help
- Many attorneys offer free consultations
- Know your statute of limitations
- Consider all your options

## Being Out at Work

### Considerations
- There's no "right" way to be out
- You don't owe anyone your personal information
- Consider the culture and your safety
- Your comfort level may change over time

### If You Choose to Come Out
- You control the timing and details
- You can come out to some people and not others
- Document any negative reactions
    `,
    checklist: [
      {
        id: "wr-1",
        text: "Know your rights",
        description: "Understand federal, state, and local protections",
      },
      {
        id: "wr-2",
        text: "Review your employee handbook",
        description: "Understand your company's policies and procedures",
      },
      {
        id: "wr-3",
        text: "Document any incidents",
        description: "Keep detailed records of discrimination or harassment",
      },
      {
        id: "wr-4",
        text: "Know your reporting options",
        description: "Understand internal and external complaint processes",
      },
      {
        id: "wr-5",
        text: "Seek support",
        description: "Find allies, ERGs, or legal help as needed",
        resources: [
          { label: "Find career coaches", url: "/search?category=career" },
          { label: "Find employment attorneys", url: "/search?category=legal" },
        ],
      },
    ],
    relatedTopics: ["finding-lgbtq-attorney", "affirming-workplace"],
    relatedCategories: ["career", "legal"],
    readTime: 9,
    lastUpdated: "2025-01-15",
  },
  {
    id: "affirming-workplace",
    slug: "affirming-workplace",
    title: "Finding and Creating Affirming Workplaces",
    description:
      "How to find inclusive employers and foster inclusion where you work.",
    category: "career",
    content: `
## What Makes a Workplace Affirming?

### Policy Indicators
- Non-discrimination policy including LGBTQIA+
- Domestic partner benefits
- Transgender-inclusive healthcare
- Gender-neutral restrooms

### Culture Indicators
- Active ERG (Employee Resource Group)
- LGBTQIA+ leadership visibility
- Inclusive language and practices
- Pride participation and support year-round

### Practical Indicators
- Easy to update name and pronouns in systems
- Flexible dress code
- Supportive parental leave policies
- Mental health benefits

## Researching Employers

### Resources to Use
- Human Rights Campaign Corporate Equality Index
- Company diversity reports
- Glassdoor LGBTQIA+ reviews
- LinkedIn employee perspectives
- ArcusPath career providers

### Questions for Interviews
- "Does your company have an LGBTQIA+ ERG or affinity group?"
- "How does the company celebrate diversity?"
- "What benefits do you offer for same-sex spouses/domestic partners?"
- "How does the company support transgender employees?"

## If You're Already Employed

### Advocating for Change
- Start or join an ERG
- Propose policy updates
- Educate leadership
- Connect with HR allies

### Building Community
- Find other LGBTQIA+ employees
- Create informal networks
- Mentor others
- Celebrate visible wins

### Protecting Yourself
- Know your rights
- Document your contributions
- Build relationships strategically
- Have an exit plan
    `,
    checklist: [
      {
        id: "aw-1",
        text: "Research company policies and culture",
        description: "Look beyond surface-level diversity statements",
      },
      {
        id: "aw-2",
        text: "Ask specific questions in interviews",
        description: "Get concrete information about inclusion efforts",
      },
      {
        id: "aw-3",
        text: "Connect with LGBTQIA+ employees or ERGs",
        description: "Get insider perspectives on the culture",
      },
      {
        id: "aw-4",
        text: "Evaluate benefits carefully",
        description: "Review healthcare, family, and other benefits",
      },
      {
        id: "aw-5",
        text: "Trust your instincts",
        description: "How does the environment feel during your interactions?",
        resources: [
          { label: "Find career coaches", url: "/search?category=career" },
        ],
      },
    ],
    relatedTopics: ["workplace-rights", "financial-planning-lgbtq"],
    relatedCategories: ["career"],
    readTime: 7,
    lastUpdated: "2025-01-15",
  },

  // GENERAL/LIFESTYLE
  {
    id: "coming-out-safely",
    slug: "coming-out-safely",
    title: "Coming Out: A Guide to Safety and Support",
    description:
      "Practical guidance on coming out, including safety planning and finding support.",
    category: "general",
    content: `
## Understanding Coming Out

Coming out is a deeply personal process that looks different for everyone. There's no "right" way or timeline. This guide provides practical considerations to help you navigate the process safely.

## Before Coming Out

### Ask Yourself
- Why do I want to come out to this person/people?
- What outcome am I hoping for?
- Am I in a safe position to do so?
- Do I have support if things don't go well?

### Safety First
If coming out might put you at risk:
- **Physical safety**: Is there any risk of violence?
- **Housing security**: Could you lose your housing?
- **Financial stability**: Could you lose financial support?
- **Employment**: Could it affect your job?

### Build Your Support System First
- Connect with LGBTQIA+ community (online or in person)
- Identify at least one supportive person
- Know your local resources
- Have a safety plan

## Having the Conversation

### Tips for Success
- Choose a private, comfortable setting
- Choose a time without distractions
- Be prepared for questions
- Give people time to process
- Have resources ready to share

### What to Say
- Be clear about what you're sharing
- Use language that feels authentic to you
- You don't have to have all the answers
- You can set boundaries on questions

## When Things Don't Go Well

### Immediate Safety
If you're in danger:
- Leave the situation if possible
- Call 988 (Suicide & Crisis Lifeline)
- Contact The Trevor Project (for youth)
- Reach out to local LGBTQ+ organizations

### Processing Rejection
- Grief is normal—allow yourself to feel it
- Rejection is about them, not your worth
- People sometimes come around with time
- Focus on supportive relationships
- Seek professional mental health support

## Coming Out Is Ongoing

Remember:
- You come out many times throughout life
- Each situation is a new choice
- You can be out in some areas and not others
- Your safety and comfort come first
    `,
    checklist: [
      {
        id: "co-1",
        text: "Assess your safety",
        description: "Consider potential risks to your physical, financial, and emotional safety",
      },
      {
        id: "co-2",
        text: "Build a support network first",
        description: "Connect with community and identify supportive people",
        resources: [
          { label: "Find support groups", url: "/search?category=lifestyle" },
          { label: "Find affirming therapists", url: "/search?category=healthcare" },
        ],
      },
      {
        id: "co-3",
        text: "Know your resources",
        description: "Have crisis lines and local organizations ready",
      },
      {
        id: "co-4",
        text: "Plan the conversation",
        description: "Think about timing, setting, and what you want to say",
      },
      {
        id: "co-5",
        text: "Have a backup plan",
        description: "Know what you'll do if the reaction isn't positive",
      },
    ],
    relatedTopics: ["mental-health-support", "finding-affirming-healthcare"],
    relatedCategories: ["healthcare", "lifestyle"],
    readTime: 8,
    lastUpdated: "2025-01-15",
  },
];

// -----------------------------------------------------------------------------
// HELPER FUNCTIONS
// -----------------------------------------------------------------------------

export function getEducationTopicBySlug(slug: string): EducationTopic | undefined {
  return educationTopics.find((topic) => topic.slug === slug);
}

export function getEducationTopicsByCategory(category: EducationTopic["category"]): EducationTopic[] {
  return educationTopics.filter((topic) => topic.category === category);
}

export function getAllEducationCategories(): Array<{
  id: EducationTopic["category"];
  name: string;
  description: string;
}> {
  return [
    {
      id: "healthcare",
      name: "Healthcare",
      description: "Finding affirming medical and mental health care",
    },
    {
      id: "legal",
      name: "Legal",
      description: "Understanding your rights and navigating legal processes",
    },
    {
      id: "financial",
      name: "Financial",
      description: "Planning for your financial future",
    },
    {
      id: "career",
      name: "Career",
      description: "Building your career in affirming environments",
    },
    {
      id: "general",
      name: "Life & Wellness",
      description: "General guidance for living authentically",
    },
  ];
}

export function getRelatedTopics(topicId: string): EducationTopic[] {
  const topic = educationTopics.find((t) => t.id === topicId);
  if (!topic) return [];

  return topic.relatedTopics
    .map((id) => educationTopics.find((t) => t.id === id))
    .filter((t): t is EducationTopic => t !== undefined);
}
