export const timeConverter = (time?: string) => {
    try {        
        if (time) {
            
            const currentDateTime = new Date();
            const chunk = time.split(":");

            if (chunk.length > 1) {
                currentDateTime.setHours(parseInt(chunk[0]));
                currentDateTime.setMinutes(parseInt(chunk[1]));
            }

            return currentDateTime;
        }
    } catch (error) {
        console.error("timeConverter", error)        
    }
    return null;
}