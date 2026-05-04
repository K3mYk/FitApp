export function calculateFFMI(weightNoFat: number, height: number) {
    const heightInMeters = height / 100;
    return weightNoFat / (heightInMeters * heightInMeters);
}

export function categorizeFFMI(ffmi: number, gender: string) {
    if (gender === 'man'){
    if (ffmi < 18) {
        return 'uder mean';
    } else if ( 18 < ffmi && ffmi < 20) {
        return 'mean';
    } else if (20 < ffmi && ffmi < 22) {
        return 'above mean';
    }  else if ( 22 < ffmi && ffmi < 23) {
        return 'perfect';
    }  else if ( 23 < ffmi && ffmi < 26) {
        return 'above average';
    }  else if ( 26 < ffmi && ffmi < 28) {
        return 'suscpest steriods';
    }  else if (ffmi > 28) {
        return 'probable sterids';
    } 
    } else if (gender === 'woman'){
        if (ffmi < 15) {
            return 'uder mean';
        } else if ( 15 < ffmi && ffmi < 17) {
            return 'mean';
        } else if (17 < ffmi && ffmi < 18) {
            return 'above mean';
        }  else if ( 18 < ffmi && ffmi < 19) {
            return 'perfect';
        }  else if ( 19 < ffmi && ffmi < 21.5) {
            return 'above average';
        }  else if ( 21.5 < ffmi && ffmi < 25) {
            return 'suscpest steriods';
        }  else if (ffmi > 25) {
            return 'probable sterids';
        } 
    }
}

