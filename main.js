'use strict';
const electron = require('electron');
const app = electron.app;  // Module pour contrôler l'application.
const BrowserWindow = electron.BrowserWindow;  // Module pour créer une fenêtre de navigateur native.

// Paramètres php
var path = require("path");
var php = require("gulp-connect-php");
php.server({
  port: 8088,
  base: path.resolve(__dirname) + '/app/public',
  bin: path.resolve(__dirname) + "/bin/php7.4"
});

// Conservez une référence globale de l’objet window. Sinon, la fenêtre
// être fermé automatiquement lorsque l'objet JavaScript est récupéré.
let mainWindow;

// Quittez lorsque toutes les fenêtres sont fermées.
app.on('window-all-closed', function () {

  // Sur OS X, il est commun pour les applications et leur barre de menus
  // pour rester actif jusqu'à ce que l'utilisateur quitte explicitement avec Cmd + Q

  if (process.platform != 'darwin') {
    app.quit();
  }

});

// Cette méthode sera appelée lorsque Electron aura terminé
// Création de la fenêtre de natigation
app.on('ready', function() {

  // Créez la fenêtre du navigateur (dimension)
  mainWindow = new BrowserWindow({width: 900, height: 600});

  // Qu'elle page charger au démarrage
  // oublier pas de changer le nom (electron-symfony-5.0) si vous avez changé le nom du repository
  mainWindow.loadURL("http://127.0.0.1:8088/index.php");

  // Décommentez pour ouvrir les DevTools.
  //mainWindow.webContents.openDevTools();

  // Quand on clique sur "close"
  mainWindow.on('closed', function () {
    mainWindow = null;
  });

});
