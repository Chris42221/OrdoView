<script>
    // Lädt die JSON vom API-Endpunkt und gibt das JSON-Objekt zurück.
    // Ziel: auf der Seite nur das rohe JSON anzeigen.
    async function APIData() {
        try {
            const response = await fetch('https://www.valvesoftware.com/about/stats', { method: 'GET' });
            if (!response.ok) {
                throw new Error(`Response status: ${response.status}`);
            }

            const Data = await response.json();
            return Data;
        } catch (error) {
            // Weiterwerfen, damit der await-Block {:catch} anzeigen kann
            console.error(error);
            throw error;
        }
    }
</script>

{#await APIData()}
    <p>Loading...</p>
{:then Data}
    <!-- Nur das JSON anzeigen, schön formatiert -->
    <pre>{JSON.stringify(Data, null, 2)}</pre>
{:catch error}
    <pre>{error?.message ?? String(error)}</pre>
{/await}