<!-- <script>
    // import { DatePicker, DateRangePicker, DateRangePickerCalendar } from '@sveltejs/date-picker';

    let selectedDate = new Date();
    let currentMonth = new Date().getMonth();
    let currentYear = new Date().getFullYear();

    const months = [
        'janv.', 'févr.', 'mars', 'avr.', 'mai', 'juin', 'juil.', 'août', 'sept.', 'oct.', 'nov.', 'déc.'
    ];

    function prevYear() {
        currentYear--;
    }

    function nextYear() {
        currentYear++;
    }

    function selectMonth(index) {
        currentMonth = index;
        selectedDate.setMonth(index);
    }

    function confirmSelection() {
        console.log('Selected Date:', selectedDate);
        // Ajouter votre logique pour confirmer la sélection
    }

    function cancelSelection() {
        currentMonth = new Date().getMonth();
        currentYear = new Date().getFullYear();
        console.log('Selection annulée');
        // Ajouter votre logique pour annuler la sélection
    }
</script>

<style>
    .calendar {
        display: flex;
        flex-direction: column;
        align-items: center;
        color: white;
    }

    .year-selector {
        display: flex;
        align-items: center;
        justify-content: space-between;
        width: 200px;
    }

    .months {
        display: grid;
        grid-template-columns: repeat(4, 1fr);
        gap: 10px;
        margin-top: 20px;
    }

    .month {
        padding: 10px;
        border-radius: 5px;
        text-align: center;
        cursor: pointer;
    }

    .selected {
        background-color: #FFD700;
        color: black;
    }

    .buttons {
        display: flex;
        justify-content: space-between;
        width: 100%;
        margin-top: 20px;
    }

    .button {
        padding: 10px 20px;
        border: none;
        border-radius: 5px;
        cursor: pointer;
    }

    .cancel {
        background-color: transparent;
        color: #FFD700;
    }

    .confirm {
        background-color: #FFD700;
        color: black;
    }
</style>

<div class="calendar">
    <h2>{months[currentMonth]} {currentYear}</h2>
    <div class="year-selector">
        <button on:click={prevYear}>&lt;</button>
        <span>{currentYear}</span>
        <button on:click={nextYear}>&gt;</button>
    </div>
    <div class="months">
        {#each months as month, index}
            <div class:month class:selected={index === currentMonth} on:click={() => selectMonth(index)}>
                {month}
            </div>
        {/each}
    </div>
    <div class="buttons">
        <button class="button cancel" on:click={cancelSelection}>Annuler</button>
        <button class="button confirm" on:click={confirmSelection}>Confirmer</button>
    </div>
</div>
 -->
