# Streetlaw.eu project

This is a Next.js project that connects streetlaw.eu with streetlaw.livepreview.cz under a single web page. Since streetlaw.eu is made with WordPress, we had to create our own database, user authentication and authorization, and also a user interface that users with no knowledge of HTML/CSS/JS can use.

There are several dependencies used for this project:

- Next.js
- TypeScript
- Next-auth
- Bcrypt
- Prisma
- TinyMCE
- TailwindCSS
- Jest
- Cypress
- and a few others

Since this project is done under GreenFoxAcademy Húlí program, it also has to fit some requirements, mainly

- REST API
- JWT
- DB
- Testing framework
- Environment variables
- Style guide, linter
- CI and CD pipeline
- Very good and comprehensive README.md, or Confluence documentation  
  And some other more challenging ones, since we are just starting in this career path

---

While thinking of the web structure, we had to create our own database that would not only hold users and their roles but also completely remake the material and lessons database (MLD) as we did not have access to the previous code. MLD has find by keyword, either specific or by parent group, normal find input text area, and also by selecting the type of school. On top of that, there is pagination and items-per-list functionality.

Users should also be able to create posts and edit anything that is already available on the site if their role supports this. All other people should be able to create at least a simple profile about them that can then be shown on the About Us page, after approval by someone with the rights to do so.

---

This project is created by [Michal Hladík](https://github.com/zelwake/huli-alumn) and [Lucie Kubátová](https://github.com/luciek16)

---

## Resources

### APIs

- ##### POST: `/api/auth/register`

        request
        body = {
            email: string,
            username: string,
            password: string,
            firstName: string,
            lastName: string
        }

        error response:
        status(400, 405, 500, 502)
        json({ error: string })

        successful response:
        status(201)
        json({ message: string })
