const { init } = await import('@eppo/node-server-sdk'); 

export default async function getEppoClient() {

    const eppoSdkKey = import.meta.env.VITE_EPPO_SDK_KEY;
    
    const eppoClientPromise = init({
      apiKey: eppoSdkKey,
      assignmentLogger: {
        logAssignment(assignment) {
          console.log('Eppo Assignment:', assignment);
        },
      },
    }).catch((err) => {
      console.error('Error initializing Eppo SDK:', err);
    });
  
    return eppoClientPromise;
  }