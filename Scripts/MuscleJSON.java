import java.io.FileWriter;
import java.io.IOException;
import com.google.gson.stream.*;
import com.google.gson.*;
import java.util.*;
import java.io.*;
import com.google.gson.Gson;

//javac -cp /lib/gson-2.2.4.jar MuscleJSON.java
//java -cp .:/lib/gson-2.2.4.jar MuscleJSON exercises.txt 


public class MuscleJSON {

	private static ArrayList<String> muscleNames;
	private static Map<String,ArrayList<String>> mapExerciseMuscleMap;

	private static void InitalizeGlobals(){
		muscleNames = new ArrayList<String>();
		mapExerciseMuscleMap = new HashMap<String,ArrayList<String>>();
	}
	private static void ReadExerciseFile(String filename) throws IOException{
		File file = new File("" + filename);
		Scanner in = new Scanner(file);
		int numExercises = Integer.parseInt(in.nextLine());
		for(int i = 0; i < numExercises; i ++){
			String next = in.nextLine();
			String line[] = next.split(",");
			String muscle = line[1];
			String exercise = line[0];
			exercise = exercise.trim();
			muscle = muscle.trim();
			if(mapExerciseMuscleMap.get(muscle) == null){
				ArrayList<String> exercises = new ArrayList<String>();
				exercises.add(exercise);
				muscleNames.add(muscle);
				mapExerciseMuscleMap.put(muscle,exercises);
			}
			else{
				ArrayList<String> exercises = mapExerciseMuscleMap.get(muscle);
				exercises.add(exercise);
				mapExerciseMuscleMap.put(muscle,exercises);
			}
		}
	}
	private static void WriteJsonFile() throws IOException{
		JsonWriter jsonWriter;
		try {
			jsonWriter = new JsonWriter(new FileWriter("test.json"));

			jsonWriter.beginObject();
   			jsonWriter.name("Muscle");
   			jsonWriter.beginArray();
   			for(int i = 0; i < muscleNames.size(); i ++){
	   			jsonWriter.beginObject();
	   			jsonWriter.name("name").value(muscleNames.get(i));
	   			jsonWriter.name("workout");
	   			jsonWriter.beginArray();
	   			ArrayList<String> exercises = mapExerciseMuscleMap.get(muscleNames.get(i));
	   			for(int y = 0; y < exercises.size() ; y++){
	   				jsonWriter.value(exercises.get(y));
	   			}
	   			jsonWriter.endArray();
	   			jsonWriter.endObject();
	   		} 

   			jsonWriter.endArray();
   			jsonWriter.endObject();
   			jsonWriter.close();
		}
		catch (IOException e) {
			e.printStackTrace();
     	}
	}
	private static void MakeJsonFilePretty() throws IOException{
		File jsonFile = new File("test.json");
		Scanner scanJson = new Scanner(jsonFile);
		String line = scanJson.nextLine();
	 	Gson gson = new GsonBuilder().setPrettyPrinting().create();
		JsonParser jp = new JsonParser();
		JsonElement je = jp.parse(line);
		String prettyJsonString = gson.toJson(je);
		FileWriter f = new FileWriter("test.json");
		f.write(prettyJsonString);
		f.close();
	}

	public static void main(String args[]) throws IOException{
		InitalizeGlobals();
		ReadExerciseFile(args[0]);
		WriteJsonFile();
		MakeJsonFilePretty();
	}
}
