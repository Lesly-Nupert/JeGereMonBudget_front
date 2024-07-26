<!-- <script>
    import 'dayjs/locale/fr.js';
    import dayjs from 'dayjs';
	import { Datepicker } from 'svelte-calendar';

    const locales = ['fr'];

    let format= 'MM/YYYY';
    let local = "fr";

    viewMode="months" 
  showDays=false


</script>

<Datepicker {format} /> -->








<!-- <script>
    import dayjs from 'dayjs';
    import 'dayjs/locale/fr.js';

    dayjs.locale('fr');

    let currentYear = dayjs().year();
    let currentMonth = dayjs().month() + 1; // Les mois dans dayjs commencent à 0

    let yearMonthOptions = [];

    // Générer les options pour les années et les mois
    for (let year = 2000; year <= 2030; year++) {
        for (let month = 1; month <= 12; month++) {
            yearMonthOptions.push({
                year,
                month,
                display: dayjs(`${year}-${month}-01`).format('MMM YYYY')
            });
        }
    }

    // Initialiser l'option sélectionnée avec l'année et le mois actuels
    let selectedOption = `${currentYear}-${currentMonth}`;

    // Gérer le changement de sélection
    function handleSelectionChange(event) {
        const [year, month] = event.target.value.split('-').map(Number);
        currentYear = year;
        currentMonth = month;
        selectedOption = event.target.value; // Mettre à jour l'option sélectionnée
    }
</script>

<style>
    .date-select {
        display: flex;
        align-items: center;
    }
</style>

<div class="date-select">
    <select bind:value={selectedOption} on:change={handleSelectionChange}>
        {#each yearMonthOptions as option}
            <option value={`${option.year}-${option.month}`}>
                {option.display}
            </option>
        {/each}
    </select>
</div> -->

<!-- <p>Année sélectionnée: {currentYear}</p>
<p>Mois sélectionné: {currentMonth}</p> -->

