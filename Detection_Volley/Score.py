import customtkinter


class Score:
    """Classe pour gérer l'affichage du score"""
    def __init__(self, parent, stats, callback_point_a, callback_point_b):
        self.parent = parent
        self.stats = stats
        self.callback_point_a = callback_point_a
        self.callback_point_b = callback_point_b
        self.creer_interface()

    def creer_interface(self):
        self.frame_score = customtkinter.CTkFrame(self.parent)
        self.frame_score.grid(row=0, column=0, columnspan=2, padx=10, pady=10, sticky="ew")

        # Score équipe A
        self.label_equipe_a = customtkinter.CTkLabel(self.frame_score, text="Équipe A", font=("Arial", 14, "bold"))
        self.label_equipe_a.grid(row=0, column=0, padx=10)

        self.label_score_a = customtkinter.CTkLabel(self.frame_score, text="0", font=("Arial", 20, "bold"))
        self.label_score_a.grid(row=1, column=0)

        # Score équipe B
        self.label_equipe_b = customtkinter.CTkLabel(self.frame_score, text="Équipe B", font=("Arial", 14, "bold"))
        self.label_equipe_b.grid(row=0, column=2, padx=10)

        self.label_score_b = customtkinter.CTkLabel(self.frame_score, text="0", font=("Arial", 20, "bold"))
        self.label_score_b.grid(row=1, column=2)

        # Indicateur de service
        self.label_service = customtkinter.CTkLabel(self.frame_score, text="Service: Équipe A", font=("Arial", 14, "bold"))
        self.label_service.grid(row=0, column=1, padx=10)

        # Boutons pour modifier le score
        btn_point_a = customtkinter.CTkButton(self.frame_score, text="+1 A", command=self.callback_point_a)
        btn_point_a.grid(row=2, column=0, pady=5)

        btn_point_b = customtkinter.CTkButton(self.frame_score, text="+1 B", command=self.callback_point_b)
        btn_point_b.grid(row=2, column=2, pady=5)

    def mettre_a_jour_score(self):
        """Met à jour l'affichage du score"""
        self.label_score_a.configure(text=str(self.stats.score_equipe_a))
        self.label_score_b.configure(text=str(self.stats.score_equipe_b))
        service_text = "Service: Équipe A" if self.stats.service_equipe_a else "Service: Équipe B"
        self.label_service.configure(text=service_text)