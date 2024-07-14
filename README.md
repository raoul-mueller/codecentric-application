# Codecentric application

This is my solution to task I received regarding my application at codecentric.

## Get started

1. Checkout this repository.
2. `npm ci`
3. Go to https://github.com/settings/tokens and create a new personal access token.
4. `export GITLAB_TOKEN=[your token]`
5. `npm run start`

## Task

### Programmiersprachen bei der codecentric

Ein Kunde fragt bei codecentric nach einem Scala Entwickler für ein Projekt an.

Um nachzusehen, ob bei der codecentric ein Entwickler mit den potentiellen Skills arbeitet, soll ein Tool entwickelt werden, das über eine einfache Abfrage der Programmiersprache die passenden Mitarbeiter anzeigt.

Als Datenbasis soll die github API benutzt werden.
https://developer.github.com/v3/

curl -i -s https://api.github.com/orgs/codecentric/members

#### Aufgabe
Es soll eine gemeinsame Datenbasis geschaffen werden, in der die codecentric Mitarbeiter, deren Repos und die entsprechenden Programmiersprachen vereinigt werden.

##### Informationen zu deiner Aufgabe:
Wenn du nicht fertig wirst,oder an einem Punkt der Aufgabe nicht mehr weiter
kommst, ist das natürlich überhaupt KEIN Problem, da wir den Stand, den du erzielst, gemeinsam besprechen und ggfs. erweitern werden.
Es geht eher um die Fragestellung, wie du an Probleme herangehst, worauf du bei der Implementierung Wert legst, wie du mit Kritik an deinem Code umgehst und wie man mit dir zusammenarbeiten kann.
Das kann man auch an einem Teilergebnis erkennen.

Die angegebene URL ist nur ein Beispiel.
Du musst weder curl, noch die URLs verwenden, sondern nur eine der von Github bereitgestellten Möglichkeiten - egal welche.

Außerdem darfst du natürlich gerne die Programmiersprache/Bibliotheken/Systeme nehmen, die Du am geeignetsten findest.
