#include <cstdlib>
#include <ctime>
#include <algorithm>
#include <iostream>
#include <string>
#include <sstream>
#define SIZE 12

using namespace std;

extern "C" int generate_random() {
    srand(time(0));
    return rand() % 20 +1;
}

struct Game {
    string title;
    int minNumberOfGamers;
    int maxNumberOfGamers;
    int age;
};

Game games[]={
        {"Wysokie napięcie", 2, 6, 12},
        {"Cytadela", 2, 8, 10},
        {"Carcassonne", 2, 6, 12},
        {"Diuna", 2, 6, 12},
        {"Tajemnicze Domostwo", 2, 7, 8},
        {"Eksplodujące kotki", 2, 5, 7},
        {"Ubongo", 2, 4, 8},
        {"Tajniacy", 4, 8, 10},
        {"Pingwiny z Madagaskaru", 2, 4, 10},
        {"Podaj dalej", 4, 8, 12},
        {"Takenoko", 2, 4, 8},
        {"Gdybyś był...", 2, 6, 10}
    };


int gameCount = sizeof(games) / sizeof(games[0]);




// extern "C" int wypisaiePoId(){
//         for (int i = 0; i < size; i++) {
//         cout << "Title: " << games[i].title << endl;
//         cout << "Number of players: " << games[i].minNumberOfGamers << "-" << games[i].maxNumberOfGamers << endl;
//         cout << "Age: " << games[i].age << endl;
//         cout << endl;
//         }
    
//     // return 0;//na razie jest git, potem bedzie zwracac coś
// }

extern "C" const char* wypisaniePoId() {
    ostringstream oss;
    oss << "[";
    for (int i = 0; i < gameCount; i++) {
        oss << "{"
            << "\"title\":\"" << games[i].title << "\","
            << "\"minNumberOfGamers\":" << games[i].minNumberOfGamers << ","
            << "\"maxNumberOfGamers\":" << games[i].maxNumberOfGamers << ","
            << "\"age\":" << games[i].age
            << "}";
        if (i < gameCount - 1) oss << ",";
    }
    oss << "]";
    static string result = oss.str();
    return result.c_str();
}
    // return 0;//na razie jest git, potem bedzie zwracac coś


// extern "C" int sortingByAlphabet(){
//     sort(games, games + gameCount, [](const Game &a, const Game &b){
//         return a.title < b.title;
//     });

//     for(int i = 0; i < gameCount; i++){
//         cout << games[i].title;
//         cout << games[i].minNumberOfGamers << "-" << games[i].maxNumberOfGamers;
//         cout << games[i].age << "+" << endl;
//     }
// }

// extern "C" int sortingByAge(){
//     sort(games, games + gameCount, [](const Game &a, const Game &b){
//         return a.age < b.age;
//     });

//     for(int i = 0; i < gameCount; i++){
//         cout << games[i].title;
//         cout << games[i].minNumberOfGamers << "-" << games[i].maxNumberOfGamers;
//         cout << games[i].age << "+" << endl;
//     }
// }

// extern "C" int sortingByMaxNumberOfGamers(){
//     sort(games, games + gameCount, [](const Game &a, const Game &b){
//         return a.maxNumberOfGamers > b.maxNumberOfGamers;
//     });

//     for(int i = 0; i < gameCount; i++){
//         cout << games[i].title;
//         cout << games[i].minNumberOfGamers << "-" << games[i].maxNumberOfGamers;
//         cout << games[i].age << "+" << endl;
//     }
// }

// extern "C" int sortingByMinNumberOfGamers(){
//     sort(games, games + gameCount, [](const Game &a, const Game &b){
//         return a.minNumberOfGamers > b.minNumberOfGamers;
//     });

//     for(int i = 0; i < gameCount; i++){
//         cout << games[i].title;
//         cout << games[i].minNumberOfGamers << "-" << games[i].maxNumberOfGamers;
//         cout << games[i].age << "+" << endl;
//     }
// }