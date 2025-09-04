import customtkinter


class Stats:
    """Classe pour gérer l'affichage des statistiques"""
    def __init__(self, parent, stats):
        self.parent = parent
        self.stats = stats
        self.creer_interface()

    def creer_interface(self):
        # Configuration de la grille pour les stats
        self.parent.grid_columnconfigure(0, weight=1)
        self.parent.grid_columnconfigure(1, weight=1)
        self.parent.grid_rowconfigure(0, weight=1)
        self.parent.grid_rowconfigure(1, weight=1)

        # Stats générales
        self.creer_stats_generales()
        # Stats par joueur
        self.creer_stats_joueurs()
        # Historique
        self.creer_historique()

    def creer_stats_generales(self):
        """Crée le panneau des statistiques générales"""
        frame_stats_gen = customtkinter.CTkFrame(self.parent)
        frame_stats_gen.grid(row=0, column=0, padx=10, pady=10, sticky="nsew")

        titre_gen = customtkinter.CTkLabel(frame_stats_gen,
                                           text="Statistiques Générales",
                                           font=("Arial", 16, "bold"))
        titre_gen.grid(row=0, column=0, pady=10)

        self.text_stats_gen = customtkinter.CTkTextbox(frame_stats_gen,
                                                       width=400,
                                                       height=200,
                                                       font=("Arial", 12))
        self.text_stats_gen.grid(row=1, column=0, padx=10, pady=5)

    def creer_stats_joueurs(self):
        """Crée le panneau des statistiques par joueur"""
        frame_stats_joueurs = customtkinter.CTkFrame(self.parent)
        frame_stats_joueurs.grid(row=0, column=1, padx=10, pady=10, sticky="nsew")

        titre_joueurs = customtkinter.CTkLabel(frame_stats_joueurs,
                                               text="Statistiques par Joueur",
                                               font=("Arial", 16, "bold"))
        titre_joueurs.grid(row=0, column=0, pady=10)

        self.text_stats_joueurs = customtkinter.CTkTextbox(frame_stats_joueurs,
                                                           width=400,
                                                           height=200,
                                                           font=("Arial", 12))
        self.text_stats_joueurs.grid(row=1, column=0, padx=10, pady=5)

    def creer_historique(self):
        """Crée le panneau d'historique"""
        frame_historique = customtkinter.CTkFrame(self.parent)
        frame_historique.grid(row=1, column=0, columnspan=2, padx=10, pady=10, sticky="nsew")

        titre_historique = customtkinter.CTkLabel(frame_historique,
                                                  text="Historique des Actions",
                                                  font=("Arial", 16, "bold"))
        titre_historique.grid(row=0, column=0, pady=10)

        self.text_historique = customtkinter.CTkTextbox(frame_historique,
                                                        width=800,
                                                        height=200,
                                                        font=("Arial", 11))
        self.text_historique.grid(row=1, column=0, padx=10, pady=5)

    def mettre_a_jour_stats(self):
        """Met à jour tous les affichages de statistiques"""
        self.mettre_a_jour_stats_generales()
        self.mettre_a_jour_stats_joueurs()
        self.mettre_a_jour_historique()

    def mettre_a_jour_stats_generales(self):
        """Met à jour les statistiques générales"""
        stats_generales = f"""Score du match :
Équipe A : {self.stats.score_equipe_a} - Sets : {self.stats.sets_equipe_a}
Équipe B : {self.stats.score_equipe_b} - Sets : {self.stats.sets_equipe_b}

Service : {'Équipe A' if self.stats.service_equipe_a else 'Équipe B'}

Actions par catégorie :
OFFENSIVES :
- Attaques : {len([a for a in self.stats.stats_joueurs["actions"] if a["action"] == "Attaque"])}
- Services : {len([a for a in self.stats.stats_joueurs["actions"] if a["action"] == "Service"])}

DÉFENSIVES :
- Réceptions : {len([a for a in self.stats.stats_joueurs["actions"] if a["action"] == "Réception"])}
- Blocks : {len([a for a in self.stats.stats_joueurs["actions"] if a["action"] == "Block"])}

NEUTRES :
- Passes : {len([a for a in self.stats.stats_joueurs["actions"] if a["action"] == "Passe"])}"""

        self.text_stats_gen.delete("1.0", "end")
        self.text_stats_gen.insert("1.0", stats_generales)

    def mettre_a_jour_stats_joueurs(self):
        """Met à jour les statistiques par joueur"""
        stats_joueurs = "Statistiques par joueur :\n\n"
        for equipe in ['A', 'B']:
            stats_joueurs += f"Équipe {equipe}:\n"
            joueurs = self.stats.joueurs_equipe_a if equipe == 'A' else self.stats.joueurs_equipe_b
            for pos, joueur in joueurs.items():
                stats = self.stats.calculer_stats_joueur(equipe, pos)
                total = sum(stats.values())
                if total > 0:
                    stats_joueurs += f"  {joueur} (Pos {pos}): {total} actions\n"
                    for action, count in stats.items():
                        if count > 0:
                            stats_joueurs += f"    {action}: {count}\n"

        self.text_stats_joueurs.delete("1.0", "end")
        self.text_stats_joueurs.insert("1.0", stats_joueurs)

    def mettre_a_jour_historique(self):
        """Met à jour l'historique des actions"""
        historique = "Dernières actions :\n\n"
        for action in self.stats.stats_joueurs["actions"][-15:]:
            historique += f"{action['temps']} - Équipe {action['equipe']} - {action['joueur']}: {action['action']}\n"

        self.text_historique.delete("1.0", "end")
        self.text_historique.insert("1.0", historique)