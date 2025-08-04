import { createContext, useContext, useState, useEffect, type ReactNode } from "react";

type Props = { children: ReactNode};

const CompareContext = createContext<any>(null);

export const useCompareContext = () => useContext(CompareContext);

export function CompareProvider({children} : Props) {
    const [compareList, setCompareList] = useState<string[]>([]);

    useEffect(() => {
        const storedList = localStorage.getItem("compareList");

        if (storedList)
        {
            setCompareList(JSON.parse(storedList));
        }
    }, []);

    useEffect(() => {
        localStorage.setItem("compareList", JSON.stringify(compareList))
    }, [compareList]);

    function addToCompareList(name: string)
    {
        setCompareList(prev => [...prev, name]);
    }
    function removeFromCompareList (name: string)
    {
        setCompareList(prev => prev.filter(element => element !== name));
    }
    function isInCompareList(name: string)
    {
        return compareList.some(element => element === name);
    }
    function clearCompareList()
    {
        setCompareList([]);
    }

    const providerValue = {
        compareList,
        addToCompareList,
        removeFromCompareList,
        isInCompareList,
        clearCompareList
    }

    return <CompareContext.Provider value={providerValue}>
        {children}
    </CompareContext.Provider>
}