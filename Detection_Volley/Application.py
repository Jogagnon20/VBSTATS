import customtkinter
from datetime import datetime
import tkinter as tk


class VolleyballStats:
    def __init__(self):
        self.score_equipe_a = 0
        self.score_equipe_b = 0
        self.sets_equipe_a = 0
        self.sets_equipe_b = 0
        self.joueurs_equipe_a = {
            1: "J1", 2: "J2", 3: "J3",
            4: "J4", 5: "J5", 6: "J6"
        }
        self.joueurs_equipe_b = {
            1: "J1", 2: "J2", 3: "J3",
            4: "J4", 5: "J5", 6: "J6"
        }
        self.service_equipe_a = True
        self.stats_joueurs = {
            "attaques": [],
            "passes": [],
            "receptions": [],
            "services": [],
            "blocks": [],
            "actions": []
        }


class Application(customtkinter.CTk):
    def __init__(self):
        super().__init__()
        self.title("Statistiques Volleyball")
        self.geometry("1600x900")

        self.stats = VolleyballStats()

        # Création du système d'onglets
        self.tabview = customtkinter.CTkTabview(self)
        self.tabview.grid(row=0, column=0, padx=10, pady=10, sticky="nsew")

        # Création des onglets
        self.tab_match = self.tabview.add("Match en cours")
        self.tab_stats = self.tabview.add("Statistiques")

        # Configuration de la grille principale
        self.grid_columnconfigure(0, weight=1)
        self.grid_rowconfigure(0, weight=1)

        # Configuration de la grille pour l'onglet match
        self.tab_match.grid_columnconfigure(0, weight=1)
        self.tab_match.grid_columnconfigure(1, weight=1)
        self.tab_match.grid_rowconfigure(0, weight=0)  # Score
        self.tab_match.grid_rowconfigure(1, weight=1)  # Actions et terrain

        # Création des interfaces
        self.creer_interface_match()
        self.creer_interface_stats()

    def creer_frame_score(self):
        frame_score = customtkinter.CTkFrame(self.tab_match)
        frame_score.grid(row=0, column=0, columnspan=2, padx=10, pady=10, sticky="ew")

        # Score équipe A
        self.label_equipe_a = customtkinter.CTkLabel(frame_score, text="Équipe A", font=("Arial", 14, "bold"))
        self.label_equipe_a.grid(row=0, column=0, padx=10)

        self.label_score_a = customtkinter.CTkLabel(frame_score, text="0", font=("Arial", 20, "bold"))
        self.label_score_a.grid(row=1, column=0)

        # Score équipe B
        self.label_equipe_b = customtkinter.CTkLabel(frame_score, text="Équipe B", font=("Arial", 14, "bold"))
        self.label_equipe_b.grid(row=0, column=2, padx=10)

        self.label_score_b = customtkinter.CTkLabel(frame_score, text="0", font=("Arial", 20, "bold"))
        self.label_score_b.grid(row=1, column=2)

        # Indicateur de service
        self.label_service = customtkinter.CTkLabel(frame_score, text="Service: Équipe A", font=("Arial", 14, "bold"))
        self.label_service.grid(row=0, column=1, padx=10)

        # Boutons pour modifier le score
        btn_point_a = customtkinter.CTkButton(frame_score, text="+1 A", command=self.ajouter_point_a)
        btn_point_a.grid(row=2, column=0, pady=5)

        btn_point_b = customtkinter.CTkButton(frame_score, text="+1 B", command=self.ajouter_point_b)
        btn_point_b.grid(row=2, column=2, pady=5)

    def creer_frame_actions_joueurs(self):
        frame_actions = customtkinter.CTkFrame(self.tab_match)
        frame_actions.grid(row=1, column=0, padx=10, pady=10, sticky="nsew")

        # Label titre
        titre = customtkinter.CTkLabel(frame_actions, text="Actions des joueurs", font=("Arial", 18, "bold"))
        titre.grid(row=0, column=0, columnspan=6, pady=10)

        # Définition des actions par catégorie avec couleurs
        self.actions_list = [
            ("Attaque", "#FF4444"),
            ("Service", "#FF8844"),
            ("Réception", "#4444FF"),
            ("Block", "#8844FF"),
            ("Passe", "#44FF44")
        ]

        # Création des sections pour chaque équipe
        for equipe in range(2):
            start_col = equipe * 3

            label_equipe = customtkinter.CTkLabel(frame_actions,
                                                  text=f"Équipe {'A' if equipe == 0 else 'B'}",
                                                  font=("Arial", 16, "bold"))
            label_equipe.grid(row=1, column=start_col, columnspan=3, pady=10)

            # Création d'un frame scrollable pour cette équipe - PLUS LARGE
            frame_equipe = customtkinter.CTkScrollableFrame(frame_actions, width=400, height=500)
            frame_equipe.grid(row=2, column=start_col, columnspan=3, padx=10, pady=5, sticky="nsew")

            # Configuration de la grille pour 2 colonnes de 3 joueurs
            frame_equipe.grid_columnconfigure(0, weight=1)
            frame_equipe.grid_columnconfigure(1, weight=1)

            # Création des boutons pour chaque joueur en 2 colonnes de 3
            for pos in range(1, 7):
                joueur = self.stats.joueurs_equipe_a[pos] if equipe == 0 else self.stats.joueurs_equipe_b[pos]

                # Calcul de la position en grille 2x3
                col = (pos - 1) % 2  # Colonne (0 ou 1)
                row = (pos - 1) // 2  # Ligne (0, 1 ou 2)

                # Frame pour chaque joueur - PLUS LARGE
                frame_joueur = customtkinter.CTkFrame(frame_equipe, width=180, height=150)
                frame_joueur.grid(row=row, column=col, padx=8, pady=8, sticky="nsew")
                frame_joueur.grid_propagate(False)  # Maintient la taille fixe

                # Configuration de la grille du frame joueur
                frame_joueur.grid_columnconfigure(0, weight=1)
                frame_joueur.grid_columnconfigure(1, weight=1)
                frame_joueur.grid_columnconfigure(2, weight=1)

                # Nom du joueur
                label_joueur = customtkinter.CTkLabel(frame_joueur,
                                                      text=f"Joueur {joueur} (Pos {pos})",
                                                      font=("Arial", 13, "bold"))
                label_joueur.grid(row=0, column=0, columnspan=3, pady=8)

                # Boutons d'actions en grille 3x2 (3 colonnes, 2 lignes)
                for idx, (action, couleur) in enumerate(self.actions_list):
                    btn_row = 1 + idx // 3  # Ligne (1 ou 2)
                    btn_col = idx % 3  # Colonne (0, 1 ou 2)

                    btn = customtkinter.CTkButton(frame_joueur,
                                                  text=action,
                                                  width=55,
                                                  height=40,
                                                  font=("Arial", 10, "bold"),
                                                  fg_color=couleur,
                                                  hover_color=self.darker_color(couleur),
                                                  command=lambda e=equipe, p=pos, a=action:
                                                  self.enregistrer_action_joueur(e, p, a))
                    btn.grid(row=btn_row, column=btn_col, padx=3, pady=3)

    def creer_frame_terrain(self):
        # Couleur marron/brun comme dans l'image
        couleur_terrain = "#8B4513"  # Marron brun
        couleur_lignes = "#FFFFFF"  # Blanc pour les lignes

        frame_terrain = customtkinter.CTkFrame(self.tab_match, fg_color=couleur_terrain)
        frame_terrain.grid(row=1, column=1, padx=10, pady=10, sticky="nsew")

        # Configuration de la grille
        for i in range(10):
            frame_terrain.grid_columnconfigure(i, weight=1)
        for i in range(16):
            frame_terrain.grid_rowconfigure(i, weight=1)

        # Titre
        titre = customtkinter.CTkLabel(frame_terrain,
                                       text="TERRAIN DE VOLLEYBALL",
                                       font=("Arial", 18, "bold"),
                                       text_color=couleur_lignes,
                                       fg_color=couleur_terrain)
        titre.grid(row=0, column=0, columnspan=10, pady=10)

        # Terrain principal - Rectangle avec bordures blanches
        terrain_principal = customtkinter.CTkFrame(frame_terrain,
                                                   fg_color=couleur_terrain,
                                                   border_width=4,
                                                   border_color=couleur_lignes,
                                                   corner_radius=5)
        terrain_principal.grid(row=1, column=1, columnspan=8, rowspan=14,
                               padx=15, pady=10, sticky="nsew")

        # Configuration du terrain principal
        for i in range(8):
            terrain_principal.grid_columnconfigure(i, weight=1)
        for i in range(14):
            terrain_principal.grid_rowconfigure(i, weight=1)

        # CÔTÉ ÉQUIPE A (partie supérieure)
        zone_equipe_a = customtkinter.CTkFrame(terrain_principal,
                                               fg_color=couleur_terrain,
                                               border_width=2,
                                               border_color=couleur_lignes,
                                               corner_radius=0)
        zone_equipe_a.grid(row=0, column=0, columnspan=8, rowspan=6,
                           padx=2, pady=2, sticky="nsew")

        # Configuration zone équipe A
        for i in range(8):
            zone_equipe_a.grid_columnconfigure(i, weight=1)
        for i in range(6):
            zone_equipe_a.grid_rowconfigure(i, weight=1)

        # Label équipe A
        label_equipe_a = customtkinter.CTkLabel(zone_equipe_a,
                                                text="ÉQUIPE A",
                                                font=("Arial", 14, "bold"),
                                                text_color="#FF0000",
                                                fg_color=couleur_terrain)
        label_equipe_a.grid(row=0, column=3, columnspan=2, pady=5)

        # Ligne d'attaque équipe A (à 3m du filet)
        ligne_attaque_a = customtkinter.CTkFrame(zone_equipe_a,
                                                 fg_color=couleur_lignes,
                                                 height=2,
                                                 corner_radius=0)
        ligne_attaque_a.grid(row=3, column=0, columnspan=8, padx=2, sticky="ew")

        # Positions des joueurs équipe A
        self.positions_a = {}
        # Positions selon le schéma volleyball standard
        positions_coords_a = {
            4: (4, 1), 3: (4, 3), 2: (4, 5),  # Ligne avant (près du filet)
            5: (1, 1), 6: (1, 3), 1: (1, 5)  # Ligne arrière
        }

        for pos, (row, col) in positions_coords_a.items():
            joueur = self.stats.joueurs_equipe_a[pos]

            # Cercle pour représenter le joueur
            player_frame = customtkinter.CTkFrame(zone_equipe_a,
                                                  fg_color=couleur_lignes,
                                                  corner_radius=30,
                                                  width=60,
                                                  height=60)
            player_frame.grid(row=row, column=col, padx=5, pady=5)
            player_frame.grid_propagate(False)

            # Configuration du frame joueur
            player_frame.grid_columnconfigure(0, weight=1)
            player_frame.grid_rowconfigure(0, weight=1)
            player_frame.grid_rowconfigure(1, weight=1)

            # Numéro de position
            num_label = customtkinter.CTkLabel(player_frame,
                                               text=str(pos),
                                               font=("Arial", 16, "bold"),
                                               text_color="#FF0000")
            num_label.grid(row=0, column=0, pady=(5, 0))

            # Nom du joueur
            name_label = customtkinter.CTkLabel(player_frame,
                                                text=joueur,
                                                font=("Arial", 8, "bold"),
                                                text_color="#000000")
            name_label.grid(row=1, column=0, pady=(0, 5))

            self.positions_a[pos] = (num_label, name_label)

        # FILET - Ligne épaisse au centre
        filet_frame = customtkinter.CTkFrame(terrain_principal,
                                             fg_color=couleur_lignes,
                                             height=4,
                                             corner_radius=0)
        filet_frame.grid(row=6, column=0, columnspan=8, rowspan=2,
                         padx=2, sticky="ew")

        # Label FILET
        label_filet = customtkinter.CTkLabel(filet_frame,
                                             text="FILET",
                                             font=("Arial", 12, "bold"),
                                             text_color="#000000",
                                             fg_color=couleur_lignes)
        label_filet.grid(row=0, column=0, columnspan=8, pady=2)

        # CÔTÉ ÉQUIPE B (partie inférieure)
        zone_equipe_b = customtkinter.CTkFrame(terrain_principal,
                                               fg_color=couleur_terrain,
                                               border_width=2,
                                               border_color=couleur_lignes,
                                               corner_radius=0)
        zone_equipe_b.grid(row=8, column=0, columnspan=8, rowspan=6,
                           padx=2, pady=2, sticky="nsew")

        # Configuration zone équipe B
        for i in range(8):
            zone_equipe_b.grid_columnconfigure(i, weight=1)
        for i in range(6):
            zone_equipe_b.grid_rowconfigure(i, weight=1)

        # Label équipe B
        label_equipe_b = customtkinter.CTkLabel(zone_equipe_b,
                                                text="ÉQUIPE B",
                                                font=("Arial", 14, "bold"),
                                                text_color="#0000FF",
                                                fg_color=couleur_terrain)
        label_equipe_b.grid(row=5, column=3, columnspan=2, pady=5)

        # Ligne d'attaque équipe B (à 3m du filet)
        ligne_attaque_b = customtkinter.CTkFrame(zone_equipe_b,
                                                 fg_color=couleur_lignes,
                                                 height=2,
                                                 corner_radius=0)
        ligne_attaque_b.grid(row=2, column=0, columnspan=8, padx=2, sticky="ew")

        # Positions des joueurs équipe B
        self.positions_b = {}
        # Positions selon le schéma volleyball standard (côté opposé)
        positions_coords_b = {
            2: (1, 1), 3: (1, 3), 4: (1, 5),  # Ligne avant (près du filet)
            1: (4, 1), 6: (4, 3), 5: (4, 5)  # Ligne arrière
        }

        for pos, (row, col) in positions_coords_b.items():
            joueur = self.stats.joueurs_equipe_b[pos]

            # Cercle pour représenter le joueur
            player_frame = customtkinter.CTkFrame(zone_equipe_b,
                                                  fg_color=couleur_lignes,
                                                  corner_radius=30,
                                                  width=60,
                                                  height=60)
            player_frame.grid(row=row, column=col, padx=5, pady=5)
            player_frame.grid_propagate(False)

            # Configuration du frame joueur
            player_frame.grid_columnconfigure(0, weight=1)
            player_frame.grid_rowconfigure(0, weight=1)
            player_frame.grid_rowconfigure(1, weight=1)

            # Numéro de position
            num_label = customtkinter.CTkLabel(player_frame,
                                               text=str(pos),
                                               font=("Arial", 16, "bold"),
                                               text_color="#0000FF")
            num_label.grid(row=0, column=0, pady=(5, 0))

            # Nom du joueur
            name_label = customtkinter.CTkLabel(player_frame,
                                                text=joueur,
                                                font=("Arial", 8, "bold"),
                                                text_color="#000000")
            name_label.grid(row=1, column=0, pady=(0, 5))

            self.positions_b[pos] = (num_label, name_label)

        # Indicateur de service
        service_frame = customtkinter.CTkFrame(frame_terrain,
                                               fg_color="#2d3436",
                                               corner_radius=8,
                                               border_width=2,
                                               border_color=couleur_lignes)
        service_frame.grid(row=15, column=1, columnspan=8, pady=5, padx=20, sticky="ew")

        self.service_indicator = customtkinter.CTkLabel(service_frame,
                                                        text="🏐 SERVICE: ÉQUIPE A",
                                                        font=("Arial", 14, "bold"),
                                                        text_color=couleur_lignes)
        self.service_indicator.grid(row=0, column=0, pady=8, padx=20)

    def mettre_a_jour_affichage_positions(self):
        """Met à jour l'affichage des positions sur le terrain"""
        for pos in range(1, 7):
            # Équipe A
            num_label_a, name_label_a = self.positions_a[pos]
            name_label_a.configure(text=self.stats.joueurs_equipe_a[pos])

            # Équipe B
            num_label_b, name_label_b = self.positions_b[pos]
            name_label_b.configure(text=self.stats.joueurs_equipe_b[pos])

    def ajouter_point_a(self):
        self.stats.score_equipe_a += 1
        self.label_score_a.configure(text=str(self.stats.score_equipe_a))
        if not self.stats.service_equipe_a:
            self.stats.service_equipe_a = True
            self.rotation_equipe(True)
            self.service_indicator.configure(text="🏐 SERVICE: ÉQUIPE A")
            self.label_service.configure(text="Service: Équipe A")
        self.verifier_fin_set()

    def ajouter_point_b(self):
        self.stats.score_equipe_b += 1
        self.label_score_b.configure(text=str(self.stats.score_equipe_b))
        if self.stats.service_equipe_a:
            self.stats.service_equipe_a = False
            self.rotation_equipe(False)
            self.service_indicator.configure(text="🏐 SERVICE: ÉQUIPE B")
            self.label_service.configure(text="Service: Équipe B")
        self.verifier_fin_set()

    def darker_color(self, hex_color):
        """Assombrit une couleur hexadécimale pour l'effet hover"""
        hex_color = hex_color.lstrip('#')
        rgb = tuple(int(hex_color[i:i + 2], 16) for i in (0, 2, 4))
        darker_rgb = tuple(max(0, c - 40) for c in rgb)
        return f"#{darker_rgb[0]:02x}{darker_rgb[1]:02x}{darker_rgb[2]:02x}"

    def creer_interface_stats(self):
        # Configuration de la grille pour les stats
        self.tab_stats.grid_columnconfigure(0, weight=1)
        self.tab_stats.grid_columnconfigure(1, weight=1)
        self.tab_stats.grid_rowconfigure(0, weight=1)
        self.tab_stats.grid_rowconfigure(1, weight=1)

        # Stats générales
        frame_stats_gen = customtkinter.CTkFrame(self.tab_stats)
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

        # Stats par joueur
        frame_stats_joueurs = customtkinter.CTkFrame(self.tab_stats)
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

        # Historique
        frame_historique = customtkinter.CTkFrame(self.tab_stats)
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

    def creer_interface_match(self):
        self.creer_frame_score()
        self.creer_frame_actions_joueurs()
        self.creer_frame_terrain()

    def enregistrer_action_joueur(self, equipe, position, action):
        joueur = self.stats.joueurs_equipe_a[position] if equipe == 0 else self.stats.joueurs_equipe_b[position]
        timestamp = datetime.now().strftime("%H:%M:%S")
        action_info = {
            "temps": timestamp,
            "equipe": "A" if equipe == 0 else "B",
            "joueur": joueur,
            "position": position,
            "action": action
        }

        # Enregistrement dans les stats
        self.stats.stats_joueurs["actions"].append(action_info)
        self.stats.stats_joueurs[action.lower() + "s"].append(action_info)

        # Mise à jour de l'affichage
        self.mettre_a_jour_stats()

    def mettre_a_jour_stats(self):
        # Stats générales
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

        # Stats par joueur
        stats_joueurs = "Statistiques par joueur :\n\n"
        for equipe in ['A', 'B']:
            stats_joueurs += f"Équipe {equipe}:\n"
            joueurs = self.stats.joueurs_equipe_a if equipe == 'A' else self.stats.joueurs_equipe_b
            for pos, joueur in joueurs.items():
                stats = self.calculer_stats_joueur(equipe, pos)
                total = sum(stats.values())
                if total > 0:
                    stats_joueurs += f"  {joueur} (Pos {pos}): {total} actions\n"
                    for action, count in stats.items():
                        if count > 0:
                            stats_joueurs += f"    {action}: {count}\n"

        self.text_stats_joueurs.delete("1.0", "end")
        self.text_stats_joueurs.insert("1.0", stats_joueurs)

        # Historique
        historique = "Dernières actions :\n\n"
        for action in self.stats.stats_joueurs["actions"][-15:]:
            historique += f"{action['temps']} - Équipe {action['equipe']} - {action['joueur']}: {action['action']}\n"

        self.text_historique.delete("1.0", "end")
        self.text_historique.insert("1.0", historique)

    def calculer_stats_joueur(self, equipe, position):
        stats = {"Attaque": 0, "Passe": 0, "Réception": 0, "Service": 0, "Block": 0}
        joueur = self.stats.joueurs_equipe_a[position] if equipe == 'A' else self.stats.joueurs_equipe_b[position]

        for action in self.stats.stats_joueurs["actions"]:
            if action["equipe"] == equipe and action["joueur"] == joueur:
                if action["action"] in stats:
                    stats[action["action"]] += 1

        return stats

    def rotation_equipe(self, equipe_a=True):
        """Effectue la rotation des joueurs pour l'équipe spécifiée"""
        if equipe_a:
            joueurs = self.stats.joueurs_equipe_a
        else:
            joueurs = self.stats.joueurs_equipe_b

        # Sauvegarde du joueur en position 1
        temp = joueurs[1]
        # Rotation
        for i in range(1, 6):
            joueurs[i] = joueurs[i + 1]
        joueurs[6] = temp

        # Mise à jour de l'affichage
        self.mettre_a_jour_affichage_positions()

    def verifier_fin_set(self):
        if (self.stats.score_equipe_a >= 25 and
                self.stats.score_equipe_a - self.stats.score_equipe_b >= 2):
            self.stats.sets_equipe_a += 1
            self.nouveau_set()
        elif (self.stats.score_equipe_b >= 25 and
              self.stats.score_equipe_b - self.stats.score_equipe_a >= 2):
            self.stats.sets_equipe_b += 1
            self.nouveau_set()

    def nouveau_set(self):
        self.stats.score_equipe_a = 0
        self.stats.score_equipe_b = 0
        self.label_score_a.configure(text="0")
        self.label_score_b.configure(text="0")
        self.mettre_a_jour_stats()


if __name__ == "__main__":
    app = Application()
    app.mainloop()