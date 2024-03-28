import { useEffect, useState } from "react";
import "./Home.style.css"
import { Duty } from "../types/duties";

import DutyList from "./DutyList";

const Home = () => {

    const [dutyList, setDutyList] = useState([] as Duty[]);
    const [shouldFetchDuties, setShouldFetchDuties] = useState(true); 


    const refreshList = () => {
        setShouldFetchDuties(true);
    }

    async function getDuties(): Promise<Duty[]> {
        try {
            const response = await fetch('/api/duties'); 
            const data = await response.json();
            return data as Duty[];
        } catch (error) {
            console.error('Error fetching duties:', error);
            return []; 
        }
    }

    useEffect(() => {
        async function fetchDuties() {
            const duties = await getDuties();
            setDutyList(duties);
            setShouldFetchDuties(false);
        }

        fetchDuties();
    }, [shouldFetchDuties]);

    return <>
        <article className="article-header">
            <header>
                <h1>My Duty List</h1>
            </header>
        </article>

        <section className="section-content">
            <DutyList dutyList={dutyList} refreshList={refreshList}/>
        </section>
    </>;
};



    

export default Home;