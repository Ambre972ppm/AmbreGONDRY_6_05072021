Projet 6 de la formation Développeur Web d'Openclassrooms

Construisez une API sécurisée pour une application d'avis gastronomiques

**Contexte :

La marque So Pekocko, qui crée des sauces piquantes, connaît un franc succès, en partie grâce à sa chaîne de vidéos YouTube “La piquante”.
L’entreprise souhaite désormais développer une application d’évaluation de ses sauces piquantes, appelée “Piquante”.
Même si l’application deviendra peut-être un magasin en ligne dans un futur proche, Sophie, la product owner de So Pekocko, a décidé que le MVP du projet sera une application web permettant aux utilisateurs d’ajouter leurs sauces préférées et de liker ou disliker les sauces ajoutées par les autres utilisateurs.


**Technologies utilisées : 

Framework : Express
Serveur : NodeJS
Base de données : MongoDB
Javascript

utilisation du pack Mongoose avec des shemas de données

****Clonez le repository : https://github.com/Ambre972ppm/AmbreGONDRY_6_05072021****

**Procédure FRONT-END : 

Pour faire fonctionner le projet :

>> Vous devez installer depuis le front: 

*NodeJS en version 12.14 ou 14.0 
*Angular CLI en version 7.0.2.
*node-sass : attention à prendre la version correspondante à NodeJS. Pour Node 14.0 par exemple, installer node-sass en version 4.14+.
Sur Windows, ces installations nécessitent d'utiliser PowerShell en tant qu'administrateur.

*Démarrer ng serve ou npm start pour avoir accès au serveur de développement. Rendez-vous sur http://localhost:4200/. L'application va se recharger automatiquement si vous modifiez un fichier source.


**Procédure BACK-END : 

>>Modifiez le fichier .env.template en .env 
*renseignez vos champs :
    - User
    - Password
    - Url Host 
(présent dans votre base de données MongoDB)

>>Installez nodemon depuis le back-end avec npm install -g nodemon.
*executez nodemon.



***En résumé pour lancé le projet***

une fois que le repository est cloné et les modules en place dans le front et le back
pour lancer le projet : 

>lancer npm start depuis le terminal sur le front-end
>lancer nodemon depuis le terminal sur le back-end
>aller à l'adresse http://localhost:4200 dans le navigateur