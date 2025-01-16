import { Eureka } from 'eureka-js-client';

class EurekaService {
  public client: Eureka;

  constructor(appName: string, port: number) {
    this.client = new Eureka({
      instance: {
        app: appName,
        vipAddress: appName,
        hostName: 'localhost',
        ipAddr: '127.0.0.1',
        port: {
          $: port,
          '@enabled': 'true',
        },
        statusPageUrl: `http://localhost:${port}/info`,
        healthCheckUrl: `http://localhost:${port}/health`,
        preferIpAddress: true,
        dataCenterInfo: {
          '@class': 'com.netflix.appinfo.InstanceInfo$DefaultDataCenterInfo',
          name: 'MyOwn',
        },
      },
      eureka: {
        host: 'localhost',
        port: 8761,
        servicePath: '/eureka/apps/',
        maxRetries: 5,
        requestRetryDelay: 500,
      },
      // logger: console,
    });
  }

  public async start() {
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
