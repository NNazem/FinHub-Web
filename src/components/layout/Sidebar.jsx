import React from 'react'

export default function Sidebar() {
  return (
    <div class="uk-width-1-5 uk-background-secondary uk-light uk-padding">
                <h2 class="uk-heading-small">Aggregatore</h2>
                <ul class="uk-nav uk-nav-default">
                    <li><a href="#"><span uk-icon="icon: home"></span> Dashboard</a></li>
                    <li><a href="#"><span uk-icon="icon: credit-card"></span> Conti</a></li>
                    <li><a href="#"><span uk-icon="icon: trending-up"></span> Spese</a></li>
                    <li><a href="#"><span uk-icon="icon: users"></span> Utenti</a></li>
                </ul>
            </div>
  )
}
