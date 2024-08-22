function sendMessage() {
    
    
// Invia un messaggio al bot tramite Telegram WebApp API
    
   
Telegram.WebApp.sendData("Ciao dal WebApp!");
}


}

/
// Inizializza la Web App quando è pronta
Telegram.WebApp.ready();