import datetime


class VolleyballStats:
    """Classe pour gérer les statistiques du match"""

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

    def ajouter_action(self, equipe, position, action):
        """Ajoute une action à l'historique"""
        joueur = self.joueurs_equipe_a[position] if equipe == 0 else self.joueurs_equipe_b[position]
        timestamp = datetime.now().strftime("%H:%M:%S")
        action_info = {
            "temps": timestamp,
            "equipe": "A" if equipe == 0 else "B",
            "joueur": joueur,
            "position": position,
            "action": action
        }

        self.stats_joueurs["actions"].append(action_info)
        self.stats_joueurs[action.lower() + "s"].append(action_info)

    def calculer_stats_joueur(self, equipe, position):
        """Calcule les statistiques d'un joueur spécifique"""
        stats = {"Attaque": 0, "Passe": 0, "Réception": 0, "Service": 0, "Block": 0}
        joueur = self.joueurs_equipe_a[position] if equipe == 'A' else self.joueurs_equipe_b[position]

        for action in self.stats_joueurs["actions"]:
            if action["equipe"] == equipe and action["joueur"] == joueur:
                if action["action"] in stats:
                    stats[action["action"]] += 1

        return stats

    def effectuer_rotation(self, equipe_a=True):
        """Effectue la rotation des joueurs pour l'équipe spécifiée"""
        if equipe_a:
            joueurs = self.joueurs_equipe_a
        else:
            joueurs = self.joueurs_equipe_b

        # Sauvegarde du joueur en position 1
        temp = joueurs[1]
        # Rotation
        for i in range(1, 6):
            joueurs[i] = joueurs[i + 1]
        joueurs[6] = temp

    def verifier_fin_set(self):
        """Vérifie si un set est terminé"""
        if (self.score_equipe_a >= 25 and
                self.score_equipe_a - self.score_equipe_b >= 2):
            self.sets_equipe_a += 1
            return True
        elif (self.score_equipe_b >= 25 and
              self.score_equipe_b - self.score_equipe_a >= 2):
            self.sets_equipe_b += 1
            return True
        return False

    def nouveau_set(self):
        """Remet les scores à zéro pour un nouveau set"""
        self.score_equipe_a = 0
        self.score_equipe_b = 0