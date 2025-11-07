import * as FileSystem from 'expo-file-system';

export interface PlayerAction {
  timestamp: string;
  player: string;
  action: string;
  score?: string;
  manche?: string;
}

class CsvService {
  private csvFilePath: string;

  constructor() {
    // Le fichier sera stocké dans le répertoire des documents de l'application
    this.csvFilePath = `${FileSystem.documentDirectory}vbstats_actions.csv`;
  }

  /**
   * Initialise le fichier CSV avec les en-têtes si le fichier n'existe pas
   */
  async initializeCsv(): Promise<void> {
    try {
      const fileInfo = await FileSystem.getInfoAsync(this.csvFilePath);

      if (!fileInfo.exists) {
        const headers = 'Timestamp,Joueur,Action,Score,Manche\n';
        await FileSystem.writeAsStringAsync(this.csvFilePath, headers);
        console.log('Fichier CSV initialisé avec succès');
      }
    } catch (error) {
      console.error('Erreur lors de l\'initialisation du CSV:', error);
      throw error;
    }
  }

  /**
   * Enregistre une action de joueur dans le CSV
   */
  async logAction(action: PlayerAction): Promise<void> {
    try {
      await this.initializeCsv();

      const csvLine = `${action.timestamp},"${action.player}","${action.action}","${action.score || ''}","${action.manche || ''}"\n`;

      // Lire le contenu existant
      const existingContent = await this.readCsv();

      // Ajouter la nouvelle ligne
      const newContent = existingContent + csvLine;

      // Écrire le nouveau contenu
      await FileSystem.writeAsStringAsync(this.csvFilePath, newContent, {
        encoding: FileSystem.EncodingType.UTF8,
      });

      console.log('Action enregistrée:', csvLine);
    } catch (error) {
      console.error('Erreur lors de l\'enregistrement de l\'action:', error);
      throw error;
    }
  }

  /**
   * Récupère le contenu complet du fichier CSV
   */
  async readCsv(): Promise<string> {
    try {
      const fileInfo = await FileSystem.getInfoAsync(this.csvFilePath);

      if (!fileInfo.exists) {
        return '';
      }

      const content = await FileSystem.readAsStringAsync(this.csvFilePath);
      return content;
    } catch (error) {
      console.error('Erreur lors de la lecture du CSV:', error);
      throw error;
    }
  }

  /**
   * Réinitialise le fichier CSV (supprime toutes les données)
   */
  async resetCsv(): Promise<void> {
    try {
      const fileInfo = await FileSystem.getInfoAsync(this.csvFilePath);

      if (fileInfo.exists) {
        await FileSystem.deleteAsync(this.csvFilePath);
      }

      await this.initializeCsv();
      console.log('CSV réinitialisé avec succès');
    } catch (error) {
      console.error('Erreur lors de la réinitialisation du CSV:', error);
      throw error;
    }
  }

  /**
   * Exporte le fichier CSV (retourne l'URI du fichier)
   */
  async exportCsv(): Promise<string> {
    try {
      const fileInfo = await FileSystem.getInfoAsync(this.csvFilePath);

      if (fileInfo.exists) {
        return this.csvFilePath;
      }

      throw new Error('Le fichier CSV n\'existe pas');
    } catch (error) {
      console.error('Erreur lors de l\'exportation du CSV:', error);
      throw error;
    }
  }

  /**
   * Récupère le chemin du fichier CSV
   */
  getFilePath(): string {
    return this.csvFilePath;
  }
}

// Export d'une instance singleton
export const csvService = new CsvService();
