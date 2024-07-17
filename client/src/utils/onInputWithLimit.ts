const onInputWithLimit = (value: string, setState: (state: string) => void, limit: number) => {
    if (value.length <= limit){
        setState(value);
    }   
}