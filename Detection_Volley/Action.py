import customtkinter


class Action:
    """Classe pour gérer le panneau d'actions des joueurs"""
    def __init__(self, parent, stats, callback_action):
        self.parent = parent
        self.stats = stats
        self.callback_action = callback_action
        self.actions_list = [
            ("Attaque", "#FF4444"),
            ("Service", "#FF8844"),
            ("Réception", "#4444FF"),
            ("Block", "#8844FF"),
            ("Passe", "#44FF44")
        ]
        self.creer_interface()

    def creer_interface(self):
        self.frame_actions = customtkinter.CTkFrame(self.parent)
        self.frame_actions.grid(row=1, column=0, padx=10, pady=10, sticky="nsew")

        # Label titre
        titre = customtkinter.CTkLabel(self.frame_actions, text="Actions des joueurs", font=("Arial", 18, "bold"))
        titre.grid(row=0, column=0, columnspan=6, pady=10)

        # Création des sections pour chaque équipe
        for equipe in range(2):
            self.creer_section_equipe(equipe)

    def creer_section_equipe(self, equipe):
        """Crée la section d'actions pour une équipe"""
        start_col = equipe * 3

        label_equipe = customtkinter.CTkLabel(self.frame_actions,
                                              text=f"Équipe {'A' if equipe == 0 else 'B'}",
                                              font=("Arial", 16, "bold"))
        label_equipe.grid(row=1, column=start_col, columnspan=3, pady=10)

        # Création d'un frame scrollable pour cette équipe
        frame_equipe = customtkinter.CTkScrollableFrame(self.frame_actions, width=400, height=500)
        frame_equipe.grid(row=2, column=start_col, columnspan=3, padx=10, pady=5, sticky="nsew")

        # Configuration de la grille pour 2 colonnes de 3 joueurs
        frame_equipe.grid_columnconfigure(0, weight=1)
        frame_equipe.grid_columnconfigure(1, weight=1)

        # Création des boutons pour chaque joueur
        for pos in range(1, 7):
            self.creer_boutons_joueur(frame_equipe, equipe, pos)

    def creer_boutons_joueur(self, parent, equipe, pos):
        """Crée les boutons d'actions pour un joueur"""
        joueur = self.stats.joueurs_equipe_a[pos] if equipe == 0 else self.stats.joueurs_equipe_b[pos]

        # Calcul de la position en grille 2x3
        col = (pos - 1) % 2
        row = (pos - 1) // 2

        # Frame pour chaque joueur
        frame_joueur = customtkinter.CTkFrame(parent, width=180, height=150)
        frame_joueur.grid(row=row, column=col, padx=8, pady=8, sticky="nsew")
        frame_joueur.grid_propagate(False)

        # Configuration de la grille du frame joueur
        frame_joueur.grid_columnconfigure(0, weight=1)
        frame_joueur.grid_columnconfigure(1, weight=1)
        frame_joueur.grid_columnconfigure(2, weight=1)

        # Nom du joueur
        label_joueur = customtkinter.CTkLabel(frame_joueur,
                                              text=f"Joueur {joueur} (Pos {pos})",
                                              font=("Arial", 13, "bold"))
        label_joueur.grid(row=0, column=0, columnspan=3, pady=8)

        # Boutons d'actions
        for idx, (action, couleur) in enumerate(self.actions_list):
            btn_row = 1 + idx // 3
            btn_col = idx % 3

            btn = customtkinter.CTkButton(frame_joueur,
                                          text=action,
                                          width=55,
                                          height=40,
                                          font=("Arial", 10, "bold"),
                                          fg_color=couleur,
                                          hover_color=self.darker_color(couleur),
                                          command=lambda e=equipe, p=pos, a=action:
                                          self.callback_action(e, p, a))
            btn.grid(row=btn_row, column=btn_col, padx=3, pady=3)

    def darker_color(self, hex_color):
        """Assombrit une couleur hexadécimale pour l'effet hover"""
        hex_color = hex_color.lstrip('#')
        rgb = tuple(int(hex_color[i:i + 2], 16) for i in (0, 2, 4))
        darker_rgb = tuple(max(0, c - 40) for c in rgb)
        return f"#{darker_rgb[0]:02x}{darker_rgb[1]:02x}{darker_rgb[2]:02x}"