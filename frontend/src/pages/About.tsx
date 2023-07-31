import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';

const stack = [
  {
    id: 1,
    title: 'React.js',
    description:
      'React is a free and open-source front-end JavaScript library for building user interfaces based on components. It is maintained by Meta and a community of individual developers and companies.',
    href: 'https://react.dev',
  },
  {
    id: 2,
    title: 'Express.js',
    description:
      'Express.js, or simply Express, is a back end web application framework for building RESTful APIs with Node.js.',
    href: 'https://expressjs.com',
  },
  {
    id: 3,
    title: 'MongoDB',
    description:
      'MongoDB is a source-available cross-platform document-oriented database program. Classified as a NoSQL database program, MongoDB uses JSON-like documents with optional schemas.',
    href: 'https://www.mongodb.com/cloud/atlas/lp/try4?utm_content=controlhterms&utm_source=google&utm_campaign=search_gs_pl_evergreen_atlas_core_prosp-brand_gic-null_emea-pk_ps-all_desktop_eng_lead&utm_term=mongodb&utm_medium=cpc_paid_search&utm_ad=e&utm_ad_campaign_id=12212624545&adgroup=115749718983&cq_cmp=12212624545&gad=1&gclid=CjwKCAjwlJimBhAsEiwA1hrp5o5KsoML7fFO5l_q4yvzKGWEcXaK-m7JRgiV8MQ1AgDCW7eQ2_TZFxoC8EsQAvD_BwE',
  },
  {
    id: 4,
    title: 'Node.js',
    description:
      'Node.js is a cross-platform, open-source server environment that can run on Windows, Linux, Unix, macOS, and more. Node.js is a back-end JavaScript runtime environment, runs on the V8 JavaScript Engine, and executes JavaScript code outside a web browser.',
    href: 'https://nodejs.org/en',
  },
  {
    id: 5,
    title: 'Redux Toolkit',
    description:
      'Redux Toolkit is a set of tools that helps simplify Redux development. It includes utilities for creating and managing Redux stores, as well as for writing Redux actions and reducers. It is used for client side state management.',
    href: 'https://redux-toolkit.js.org',
  },
  {
    id: 6,
    title: 'Tanstack React Query',
    description:
      'TanStack Query (FKA React Query) is often described as the missing data-fetching library for web applications, but in more technical terms, it makes fetching, caching, synchronizing and updating server state in your web applications a breeze. It is used for server side state management',
    href: 'https://tanstack.com/query/latest',
  },
  {
    id: 7,
    title: 'React Hook Form',
    description:
      'React Hook Form is a library that helps you validate forms in React. It is a minimal library without any other dependencies, while being performant and straightforward to use, requiring developers to write fewer lines of code than other form libraries.',
    href: 'https://react-hook-form.com',
  },
  {
    id: 8,
    title: 'Tailwind CSS',
    description:
      'Tailwind CSS is an open source CSS framework. The main feature of this library is that, unlike other CSS frameworks like Bootstrap, it does not provide a series of predefined classes for elements such as buttons or tables.',
    href: 'https://tailwindcss.com',
  },
];

function About() {
  return (
    <div className="max-w-5xl mx-auto">
      <Helmet>
        <title>About - Blogverse</title>
      </Helmet>
      <h1 className="font-bold text-4xl my-3 text-center">About</h1>
      <h1 className="font-bold text-3xl mb-2">About me:</h1>
      <div className="max-w-4xl mx-auto">
        <p>
          Salam 👋, I am Muhammad Zunnoorain Rafi, Graduated from Sargodha
          University with BSIT degree. I am interested in Full-stack Web
          Development and currently learning it. I have 1 year of experience in
          web development. My learning sources are YouTube and Udemy. I know how
          much teamwork can cause a positive change in the company and for
          individuals. I believe that teamwork makes dream work, and I consider
          myself a good team member.
        </p>
        <span>For more details, see my portfolio 👉</span>{' '}
        <Link
          className="link link-primary"
          target="_blank"
          to="https://zunnoorain.vercel.app"
        >
          https://zunnoorain.vercel.app
        </Link>
      </div>
      <div>
        <h1 className="font-bold text-3xl my-2">About Stack:</h1>
        <div className="max-w-4xl mx-auto">
          {stack.map((val) => {
            return (
              <div key={val.id}>
                <Link
                  target="_blank"
                  className="font-bold link hover:text-blue-900 link-primary text-xl"
                  to={val.href}
                >
                  # {val.title}
                </Link>
                <p>{val.description}</p>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default About;
