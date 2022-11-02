TEAM  WORK
    Codecool FE-22-07
    week 10–11
    table    1

TEAM NAME
    No Name Team :D

TEAM MEMBERS
    Ildi (Ildikó Ácsné Sulyok)
    Csaba (Csaba Nagyapáti)
    Balázs (Balázs Tibor Tildy)
    Zsófi (Zsófia Thuránszky)
    Gábor (Gábor Neubauer)

TEAM CONVENTIONS FOR WORK
    Start: Délelőtti session után 10 perccel Google Meeten
    End: kb. 17 óra
    Ebédszünet: 12.00–12.45
    Szünet: szükség szerint
    Nem várunk senkire :D


PROJECT DETALIS

Tasks, criteria, notes, hints, background materials (JOURNEY):
    https://journey.code.cool/v2/learn/courses/205/modules/3652/units/0/TEAM/23552

Design template:
    https://monsterone.com/website-templates/foodbar-fast-food-restaurant-html-template-o226226/

GitHub repositoy:
    https://github.com/CodecoolGlobal/pizza-order-prototype-javascript-HordodongA

Deployed page:



PREZENTÁCIÓ (FEJENKÉNT 1 perc)
1. CSABA 
    Az oldal tartalma JavaScripttel generálódik le for ciklusokkal: 
    A pizzákat kártyákon jelenítjük meg, jobb oldalon pedig a kosár tartalmát és az input mezőket.
    Flexbox-szal dolgoztunk, a reszponzivitás érdekében wrappel.
    Fent hero banner látható, amit BootStrappel készítettünk. A BootStrapet cdn szolgálja ki.

2. ILDI
    Az oldal meghívásakor a "/ semmire" küldött GET requestre a szerver kiszolgálja az index.html-t.
    Betöltődéskor a frontend JavaScriptünk a "/apira" küld GET requestet, 
    a szerver kiszolgálja a pizzák adatait tartalmazó adatbázisfájlt. 
    A frontend JS ebből generálja a kártyákat.

3. BALÁZS
    A kosárba rakom gomb megnyomásakor a JS összeszedi a gombhoz tartozó pizza (kártya) adatait, és beleteszi az actualOrder változóba, ami egy tömb. 
    Ha az adott pizza már szerepel a tömbben, akkor csak a mennyiségét növeli, nem teszi hozzá újból.
    Végül meghívja a kosárgeneráló függvényt, és odaadja neki az actuaOrder tömböt bemeneti paraméterként.
    A kosárgeneráló függvény az actualOrder adataiból generálja és jeleníti meg a kosarat, kiszámolja és kijelzi a rendelés végösszegét is.

4. ZSÓFI
    Az input mezőket a HTML-ben írtuk meg, formba rendezve. Amíg a kosár üres, a JavaScript elrejti a szakaszt.
    A submit gomb összegyűjti a form adatait, tömbbe rendezi, összefűzi az actualOrder tömbbel (spread operatorral). 
    Az összesített adatokat odaadja egy másik függvénynek.

5. GÁBOR
    A sendOrderData függvény a rendelés adatait POST requesttel elküldi a szervernek.
    A válasz alapján visszajelzést ad a usernek és név szerint megköszöni a rendelést.
    A szerver a POST request adaiait jájlba menti. A fájlnév a szerveridő alapján a dátumból, időből és a megrendelő nevéből áll össze. Az idő ezredmásodperces pontosságig szerepel, elhanyagolhatóvá téve az ismétlődő fájlnevek esélyét.



WEEK 10-11 TEAMS
T1
Ildi (Ildikó Ácsné Sulyok)
Csaba (Csaba Nagyapáti)
Balázs (Balázs Tibor Tildy)
Zsófi (Zsófia Thuránszky)
Gábor (Gábor Neubauer)

T2
Andris (András Lendvai)
Ági (Ágnes Kovács)
Ádám (Ádám Róka)
Dani (Dániel Forrai)
Tomi (Tamás Nagy)

T3
Adam (Ádám Hajzer)
Tamás (Tamás Köles)
Geri (Gergő Czene)
Judit (Judit Csohány )
Imi (Imre Bokányi)

T4
Lilla (Lilla Anna Kalmár)
Ricsi (Richárd Máté Szabó)
Dóra (Dóra Cserenyec)
Heni (Henrietta Tóth)
Rebeka (Rebeka Posta)

T5
János (János Árpád Bundy)
Beni (Benedek Vucsics)
Viki (Viktória Jurcsák)
Béla (Béla Kallós)
Katica (Katalin Anna Czifferi)