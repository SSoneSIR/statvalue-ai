import ImportCSV from "@/scripts/import-csv";

export default function ImportPage() {
  return (
    <div className="container py-8 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
      <div className="flex flex-col items-center gap-8 text-center">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold">Import Player Data</h1>
          <p className="text-muted-foreground mt-2">
            Upload CSV files to import player data into the database
          </p>
        </div>

        <ImportCSV />

        <div className="w-full max-w-md p-4 border rounded-md bg-blue-50 text-blue-800">
          <h3 className="font-bold mb-2">CSV File Format</h3>
          <p className="text-sm mb-2">
            Your CSV files should have the following structure:
          </p>

          <div className="text-xs text-left mb-2">
            <strong>Players CSV:</strong> id, name, position, age, nationality,
            etc.
          </div>

          <div className="text-xs text-left">
            <strong>Player Stats CSV:</strong> player_id, season, goals,
            assists, etc.
          </div>
        </div>
      </div>
    </div>
  );
}
