CREATE_JOBS_TABLE=("CREATE TABLE IF NOT EXISTS Jobs (id SERIAL PRIMARY KEY, jobTitle TEXT, jobDescription TEXT, jobCompany TEXT, image TEXT, date TIMESTAMP);")
INSERT_JOBS = """INSERT INTO Jobs (jobTitle, jobDescription, jobCompany, image, date)
    VALUES (
        'Software Developer',
        'A minimum of 5 years of experience in software engineering, with a focus on leadership roles. Strong technical background with expertise in multiple programming languages and frameworks. Excellent communication skills, both written and verbal, to effectively convey technical concepts to diverse stakeholders. Proven ability to collaborate with cross-functional teams and align software development goals with broader business objectives. Strong project management skills, including the ability to prioritize and manage multiple tasks simultaneously. Demonstrated leadership in fostering a positive and collaborative team culture',
        'Intel',
        'https://upload.wikimedia.org/wikipedia/commons/6/64/Intel-logo-2022.png',
        NOW()
    ), (
        'Cloud Software Development Engineer',
        'Minimum Qualifications
Bachelors or Masters degree in Computer Science, Mathematics orComputer/Electrical Engineering or related field or equivalent work experience in lieu of degree- Software development/integration/validation
Domain knowledge in the areas of Linux kernel, hypervisors and open source operating systems
Familiarity with Linux distributions such as Ubuntu, Red Hat, SUSE, or others
Strong collaboration and communication skills
Passion to work with the open sourcecommunity
Preferred Qualifications

Track record of successful upstreaming of Linux kernel patches- Experience working with worldwide teams
Knowledge of Amazon Architecture',
        'Amazon',
        'https://images.crowdspring.com/blog/wp-content/uploads/2023/07/03162944/amazon-logo-1.png',
        NOW()
    ),
    (
        'FPGA Software Engineer',
        'In this role, the candidate will provide the following but not limited to:

Researches, designs, develops, and optimizes software tools that enable the use of Field Programmable Gate Arrays (FPGA).

Develops and optimizes compilers, flows, assemblers, models, tools, runtimes, and/or firmware that are closely coupled to FPGA silicon, IP, and boards, while leveraging strong knowledge of FPGA hardware, logic design, board design, semiconductor devices, and chip layout.

Designs, develops, and optimizes software abstractions and frameworks for acceleration with the FPGA for domains such as deep learning, DSP algorithms, or data analytics.

Responds to customer/client requests or events as they occur.',
        'Microsoft',
        'https://upload.wikimedia.org/wikipedia/commons/thumb/9/96/Microsoft_logo_%282012%29.svg/2560px-Microsoft_logo_%282012%29.svg.png',
        NOW()
    );"""
getAllJobsDBCommand = """SELECT * FROM jobs"""