# Filmani film webbapplication

Webbapplikationen Filmani är en plattform för informationssökning och recensioner gällande filmer. I denna applikation kan du:
- Se vilka filmer är trendande nuförtiden
- Sök efter en specifik film och läs dess detaljer i en gigantisk filmdatabas
- Skapa användar konto 
- Lämna filmrecension 
- Gilla andras filmrecensioner 
- Se hur många ggr har en film sökts/visats på Filmani
- Möjlighet för användarkonto med administrations behörigheter som kan hantera andra användarens konto och filmrecensioner

Denna applikation är utvecklad med [React](https://react.dev/) v19 och stylad med [Tailwind](https://tailwindcss.com/) v4.0

Filmani, för användarkonton och recensioner konsumerar en REST API som är byggd med ASP.NET Core 9.0 web api.


## Installation och körning i lokalmiljö:
1. Klona repo:t:
```sh
git clone https://github.com/Himoazo/Filmani.git
```

2. Installera beroenden (Dependencies):

Navigera till katalogen där appen är klonad till sedan

```sh
npm install
```

3. Skapa konto och hämta egen API key från [TMDB](https://www.themoviedb.org/signup) 

4. Fyll i din nyckel som värdet för VITE_API_KEY= i .env.sample filen, ta bort ordet "sample" och spara.

5. Kör applikationen lokalt:
```sh
npm run dev
```