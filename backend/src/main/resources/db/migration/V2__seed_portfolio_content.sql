-- Initial portfolio content. To change content later, add a new migration (V3__..., V4__...).

insert into profile (id, full_name, headline, tagline, current_position, location, email, avatar_url, about)
values (1,
        'Mohit Sharma',
        'Software Engineer – Java Full Stack (Spring Boot, Microservices, React)',
        'I build reliable Java microservices and clean React frontends.',
        'Specialist Programmer at Infosys',
        'India',
        'isharma.ms@gmail.com',
        'https://mohitcode439.netlify.app/profile/avatar.jpg',
        'I''m a Software Engineer at Infosys, where I build microservices with Java and Spring Boot. I''ve built services that mock external APIs, so teams can develop and test without depending on live third-party endpoints, which also reduces API costs. I''ve contributed to test automation with Playwright and Cucumber that cut testing time and effort, and I''ve integrated MoEngage to deliver notifications across SMS, Email, Push and RCS.

I graduated from NIT Patna in 2025 with a B.Tech in Electrical Engineering and a Minor in Computer Science and Engineering. I enjoy problem solving and have solved 500+ data structures and algorithms problems. On the frontend I work with React and TypeScript, and I''m currently exploring Spring AI for building AI-powered Java applications.');

insert into social_link (id, label, url, sort_order) values
    (1, 'GitHub', 'https://github.com/mohitcode439', 1),
    (2, 'LinkedIn', 'https://www.linkedin.com/in/mohit-sharma-8a780a223', 2),
    (3, 'LeetCode', 'https://leetcode.com/u/mohitcode439', 3),
    (4, 'GeeksforGeeks', 'https://www.geeksforgeeks.org/user/mohitsharma10102001/', 4);

insert into experience (id, company, title, location, start_date, end_date, sort_order)
values (1, 'Infosys Limited', 'Specialist Programmer', 'India', date '2025-10-01', null, 1);

insert into experience_highlight (experience_id, sort_order, content) values
    (1, 0, 'Build and maintain Java/Spring Boot microservices exposing REST APIs for a client application.'),
    (1, 1, 'Built services that mock external third-party APIs for development and testing, reducing dependency on live endpoints and lowering API usage costs.'),
    (1, 2, 'Simulated success, error and timeout responses from external services to enable parallel development and testing.'),
    (1, 3, 'Contributed to end-to-end and regression test automation using Playwright and Cucumber (BDD), reducing testing time and manual effort.'),
    (1, 4, 'Integrated the MoEngage customer-engagement platform to deliver notifications across SMS, Email, Push and RCS channels.');

insert into skill_category (id, name, sort_order) values
    (1, 'Languages', 1),
    (2, 'Backend', 2),
    (3, 'Frontend', 3),
    (4, 'Testing', 4),
    (5, 'Databases', 5),
    (6, 'Tools & Platforms', 6);

insert into skill (category_id, sort_order, name) values
    (1, 0, 'Java'), (1, 1, 'JavaScript'), (1, 2, 'TypeScript'), (1, 3, 'SQL'), (1, 4, 'Python'), (1, 5, 'C++'), (1, 6, 'HTML'), (1, 7, 'CSS'),
    (2, 0, 'Spring Boot'), (2, 1, 'Spring Framework'), (2, 2, 'Spring AI'), (2, 3, 'REST APIs'), (2, 4, 'Microservices'), (2, 5, 'Node.js'), (2, 6, 'Express.js'),
    (3, 0, 'React'), (3, 1, 'Redux'), (3, 2, 'Tailwind CSS'), (3, 3, 'Three.js'),
    (4, 0, 'Playwright'), (4, 1, 'Cucumber (BDD)'), (4, 2, 'API Virtualization / Service Mocking'), (4, 3, 'WireMock'), (4, 4, 'JUnit'), (4, 5, 'Mockito'),
    (5, 0, 'MongoDB'), (5, 1, 'SQL'),
    (6, 0, 'Git'), (6, 1, 'GitHub'), (6, 2, 'MoEngage'), (6, 3, 'Postman'), (6, 4, 'Maven'), (6, 5, 'Jenkins');

insert into project (id, name, description, image_url, live_url, github_url, sort_order) values
    (1, 'Personal Portfolio (Java Full Stack)',
     'Spring Boot REST API with Spring Data JPA, Flyway-managed PostgreSQL, Bean Validation with RFC 9457 error responses, OpenAPI docs and Actuator health checks. React + TypeScript frontend that renders instantly from a bundled snapshot and syncs live API data. Tested with JUnit 5, Mockito, MockMvc and Vitest, with GitHub Actions CI and Docker deployment.',
     'https://mohitcode439.netlify.app/projects/portfolio.png',
     'https://mohitcode439.netlify.app/',
     'https://github.com/mohitcode439/mohit-sharma-portfolio', 1),
    (2, 'Smart Health Monitoring and Emergency Response',
     'Multi-class logistic regression model that classifies abnormal health conditions from heart rate, body temperature and SpO2 readings.',
     null, null, null, 2);

insert into project_tech (project_id, sort_order, name) values
    (1, 0, 'Java 25'), (1, 1, 'Spring Boot 4'), (1, 2, 'PostgreSQL'), (1, 3, 'React 19'), (1, 4, 'TypeScript'), (1, 5, 'Docker'),
    (2, 0, 'Python'), (2, 1, 'Pandas'), (2, 2, 'NumPy'), (2, 3, 'Scikit-learn');

insert into education (id, institution, degree, minor, start_year, end_year, cgpa, sort_order)
values (1, 'National Institute of Technology (NIT) Patna', 'B.Tech, Electrical Engineering',
        'Computer Science and Engineering (IoT)', 2021, 2025, '8.22/10', 1);

insert into achievement (id, content, sort_order) values
    (1, 'Solved 500+ Data Structures and Algorithms problems on LeetCode and GeeksforGeeks.', 1),
    (2, 'MoEngage Implementation Expert Certification – MoEngage', 2);
