import { Eureka } from 'eureka-js-client';

class EurekaService {
  public client: Eureka;

  constructor(appName: string, port: number) {
    this.client = new Eureka({
      instance: {
        app: appName,
        vipAddress: appName, // Nom virtuel pour identifier l'application
        hostName: 'localhost', // Nom d'hôte
        ipAddr: '127.0.0.1', // Adresse IP
        port: {
          $: port,
          '@enabled': 'true', // Corrigez ici en forçant à une chaîne de caractères
        },
        statusPageUrl: `http://localhost:${port}/info`, // URL de statut
        healthCheckUrl: `http://localhost:${port}/health`, // URL pour le health check
        preferIpAddress: true, // Laissez tel quel (booléen ici est correct)
        dataCenterInfo: {
          '@class': 'com.netflix.appinfo.InstanceInfo$DefaultDataCenterInfo',
          name: 'MyOwn', // Nécessaire pour des environnements locaux
        },
      },
      eureka: {
        host: 'localhost', // Adresse du serveur Eureka
        port: 8761, // Port du serveur Eureka
        servicePath: '/eureka/apps/', // Endpoint pour l'enregistrement
        maxRetries: 5, // Nombre de tentatives
        requestRetryDelay: 500, // Délai entre les tentatives
      },
      logger: console,
    });
  }

  public start() {
    console.log('Starting Eureka Client...');
    this.client.start((error: any) => {
      if (error) {
        console.error('Erreur lors de l’enregistrement auprès de Eureka :', error);
      } else {
        console.log('Service enregistré auprès de Eureka');
      }
    });
  }
}

export default EurekaService;
