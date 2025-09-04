import customtkinter


class Terrain:
    """Classe pour gérer l'affichage du terrain"""
    def __init__(self, parent, stats):
        self.parent = parent
        self.stats = stats
        self.couleur_terrain = "#8B4513"
        self.couleur_lignes = "#FFFFFF"
        self.positions_a = {}
        self.positions_b = {}
        self.creer_interface()

    def creer_interface(self):
        self.frame_terrain = customtkinter.CTkFrame(self.parent, fg_color=self.couleur_terrain)
        self.frame_terrain.grid(row=1, column=1, padx=10, pady=10, sticky="nsew")

        # Configuration de la grille
        for i in range(10):
            self.frame_terrain.grid_columnconfigure(i, weight=1)
        for i in range(16):
            self.frame_terrain.grid_rowconfigure(i, weight=1)

        self.creer_titre()
        self.creer_terrain_principal()
        self.creer_indicateur_service()

    def creer_titre(self):
        """Crée le titre du terrain"""
        titre = customtkinter.CTkLabel(self.frame_terrain,
                                       text="TERRAIN DE VOLLEYBALL",
                                       font=("Arial", 18, "bold"),
                                       text_color=self.couleur_lignes,
                                       fg_color=self.couleur_terrain)
        titre.grid(row=0, column=0, columnspan=10, pady=10)

    def creer_terrain_principal(self):
        """Crée le terrain principal avec les zones d'équipes"""
        terrain_principal = customtkinter.CTkFrame(self.frame_terrain,
                                                   fg_color=self.couleur_terrain,
                                                   border_width=4,
                                                   border_color=self.couleur_lignes,
                                                   corner_radius=5)
        terrain_principal.grid(row=1, column=1, columnspan=8, rowspan=14,
                               padx=15, pady=10, sticky="nsew")

        # Configuration du terrain principal
        for i in range(8):
            terrain_principal.grid_columnconfigure(i, weight=1)
        for i in range(14):
            terrain_principal.grid_rowconfigure(i, weight=1)

        self.creer_zone_equipe_a(terrain_principal)
        self.creer_filet(terrain_principal)
        self.creer_zone_equipe_b(terrain_principal)

    def creer_zone_equipe_a(self, parent):
        """Crée la zone de l'équipe A"""
        zone_equipe_a = customtkinter.CTkFrame(parent,
                                               fg_color=self.couleur_terrain,
                                               border_width=2,
                                               border_color=self.couleur_lignes,
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
                                                fg_color=self.couleur_terrain)
        label_equipe_a.grid(row=0, column=3, columnspan=2, pady=5)

        # Ligne d'attaque équipe A
        ligne_attaque_a = customtkinter.CTkFrame(zone_equipe_a,
                                                 fg_color=self.couleur_lignes,
                                                 height=2,
                                                 corner_radius=0)
        ligne_attaque_a.grid(row=3, column=0, columnspan=8, padx=2, sticky="ew")

        # Positions des joueurs équipe A
        self.creer_positions_joueurs_a(zone_equipe_a)

    def creer_zone_equipe_b(self, parent):
        """Crée la zone de l'équipe B"""
        zone_equipe_b = customtkinter.CTkFrame(parent,
                                               fg_color=self.couleur_terrain,
                                               border_width=2,
                                               border_color=self.couleur_lignes,
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
                                                fg_color=self.couleur_terrain)
        label_equipe_b.grid(row=5, column=3, columnspan=2, pady=5)

        # Ligne d'attaque équipe B
        ligne_attaque_b = customtkinter.CTkFrame(zone_equipe_b,
                                                 fg_color=self.couleur_lignes,
                                                 height=2,
                                                 corner_radius=0)
        ligne_attaque_b.grid(row=2, column=0, columnspan=8, padx=2, sticky="ew")

        # Positions des joueurs équipe B
        self.creer_positions_joueurs_b(zone_equipe_b)

    def creer_filet(self, parent):
        """Crée le filet au centre du terrain"""
        filet_frame = customtkinter.CTkFrame(parent,
                                             fg_color=self.couleur_lignes,
                                             height=4,
                                             corner_radius=0)
        filet_frame.grid(row=6, column=0, columnspan=8, rowspan=2,
                         padx=2, sticky="ew")

        # Label FILET
        label_filet = customtkinter.CTkLabel(filet_frame,
                                             text="FILET",
                                             font=("Arial", 12, "bold"),
                                             text_color="#000000",
                                             fg_color=self.couleur_lignes)
        label_filet.grid(row=0, column=0, columnspan=8, pady=2)

    def creer_positions_joueurs_a(self, parent):
        """Crée les positions des joueurs de l'équipe A"""
        positions_coords_a = {
            4: (4, 1), 3: (4, 3), 2: (4, 5),  # Ligne avant
            5: (1, 1), 6: (1, 3), 1: (1, 5)  # Ligne arrière
        }

        for pos, (row, col) in positions_coords_a.items():
            joueur = self.stats.joueurs_equipe_a[pos]
            num_label, name_label = self.creer_joueur_sur_terrain(parent, pos, joueur, "#FF0000", row, col)
            self.positions_a[pos] = (num_label, name_label)

    def creer_positions_joueurs_b(self, parent):
        """Crée les positions des joueurs de l'équipe B"""
        positions_coords_b = {
            2: (1, 1), 3: (1, 3), 4: (1, 5),  # Ligne avant
            1: (4, 1), 6: (4, 3), 5: (4, 5)  # Ligne arrière
        }

        for pos, (row, col) in positions_coords_b.items():
            joueur = self.stats.joueurs_equipe_b[pos]
            num_label, name_label = self.creer_joueur_sur_terrain(parent, pos, joueur, "#0000FF", row, col)
            self.positions_b[pos] = (num_label, name_label)

    def creer_joueur_sur_terrain(self, parent, pos, joueur, couleur, row, col):
        """Crée un joueur sur le terrain"""
        player_frame = customtkinter.CTkFrame(parent,
                                              fg_color=self.couleur_lignes,
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
                                           text_color=couleur)
        num_label.grid(row=0, column=0, pady=(5, 0))

        # Nom du joueur
        name_label = customtkinter.CTkLabel(player_frame,
                                            text=joueur,
                                            font=("Arial", 8, "bold"),
                                            text_color="#000000")
        name_label.grid(row=1, column=0, pady=(0, 5))

        return num_label, name_label

    def creer_indicateur_service(self):
        """Crée l'indicateur de service"""
        service_frame = customtkinter.CTkFrame(self.frame_terrain,
                                               fg_color="#2d3436",
                                               corner_radius=8,
                                               border_width=2,
                                               border_color=self.couleur_lignes)
        service_frame.grid(row=15, column=1, columnspan=8, pady=5, padx=20, sticky="ew")

        self.service_indicator = customtkinter.CTkLabel(service_frame,
                                                        text="🏐 SERVICE: ÉQUIPE A",
                                                        font=("Arial", 14, "bold"),
                                                        text_color=self.couleur_lignes)
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

    def mettre_a_jour_service(self):
        """Met à jour l'indicateur de service"""
        service_text = "🏐 SERVICE: ÉQUIPE A" if self.stats.service_equipe_a else "🏐 SERVICE: ÉQUIPE B"
        self.service_indicator.configure(text=service_text)