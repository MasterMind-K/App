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
    int numberOfGamers;
    int age;
};

Game games[]={
        {"Wysokie napięcie", 2, 6, 4, 12},
        {"Cytadela", 2, 8, 6, 10},
        {"Carcassonne", 2, 6, 4, 12},
        {"Diuna", 2, 6, 4, 12},
        {"Tajemnicze Domostwo", 2, 7, 5, 8},
        {"Eksplodujące kotki", 2, 5, 3, 7},
        {"Ubongo", 2, 4, 2, 8},
        {"Tajniacy", 4, 8, 4, 10},
        {"Pingwiny z Madagaskaru", 2, 4, 2, 10},
        {"Podaj dalej", 4, 8, 6, 12},
        {"Takenoko", 2, 4, 2, 8},
        {"Gdybyś był...", 2, 6, 4, 10}
    };


int gameCount = sizeof(games) / sizeof(games[0]);


extern "C" const char* wypisaniePoId() {
    ostringstream oss;
    oss << "[";
    for (int i = 0; i < gameCount; i++) {
        oss << "{"
            << "\"title\":\"" << games[i].title << "\","
            << "\"minNumberOfGamers\":" << games[i].minNumberOfGamers << ","
            << "\"maxNumberOfGamers\":" << games[i].maxNumberOfGamers << ","
            << "\"numberOfGamers\":" << games[i].numberOfGamers << ","
            << "\"age\":" << games[i].age
            << "}";
        if (i < gameCount - 1) oss << ",";
    }
    oss << "]";
    static string result = oss.str();
    return result.c_str();
}


extern "C" const char* sortingByAlphabet(){
    sort(games, games + gameCount, [](const Game &a, const Game &b){
        return a.title < b.title;
    });

    ostringstream oss;
    oss << "[";
    for (int i = 0; i < gameCount; i++) {
        oss << "{"
            << "\"title\":\"" << games[i].title << "\","
            << "\"minNumberOfGamers\":" << games[i].minNumberOfGamers << ","
            << "\"maxNumberOfGamers\":" << games[i].maxNumberOfGamers << ","
            << "\"numberOfGamers\":" << games[i].numberOfGamers << ","
            << "\"age\":" << games[i].age
            << "}";
        if (i < gameCount - 1) oss << ",";
    }
    oss << "]";
    static string result = oss.str();
    return result.c_str();
}

extern "C" const char* sortingByAge(){
    sort(games, games + gameCount, [](const Game &a, const Game &b){
        return a.age < b.age;
    });

    ostringstream oss;
    oss << "[";
    for(int i = 0; i < gameCount; i++){
        oss << "{"
            << "\"title\":\"" << games[i].title << "\","
            << "\"minNumberOfGamers\":" << games[i].minNumberOfGamers << ","
            << "\"maxNumberOfGamers\":" << games[i].maxNumberOfGamers << ","
            << "\"numberOfGamers\":" << games[i].numberOfGamers << ","
            << "\"age\":" << games[i].age
            << "}";
        if (i < gameCount - 1) oss << ",";
    }
    oss << "]";
    static string result = oss.str();
    return result.c_str();
}

extern "C" const char* sortingByNumberOfGamers(){
    sort(games, games + gameCount, [](const Game &a, const Game &b){
        return a.numberOfGamers < b.numberOfGamers;
    });

    ostringstream oss;
    oss << "[";
    for(int i = 0; i < gameCount; i++){
        oss << "{"
            << "\"title\":\"" << games[i].title << "\","
            << "\"minNumberOfGamers\":" << games[i].minNumberOfGamers << ","
            << "\"maxNumberOfGamers\":" << games[i].maxNumberOfGamers << ","
            << "\"numberOfGamers\":" << games[i].numberOfGamers << ","
            << "\"age\":" << games[i].age
            << "}";
        if(i < gameCount - 1) oss << ",";
    }
    oss << "]";
    static string result = oss.str();
    return result.c_str();
}


extern "C" const char* sortingByMinNumberOfGamers(){
    sort(games, games + gameCount, [](const Game &a, const Game &b){
        return a.minNumberOfGamers < b.minNumberOfGamers;
    });

    ostringstream oss;
    oss << "[";
    for(int i = 0; i < gameCount; i++){
        oss << "{"
            << "\"title\":\"" << games[i].title << "\","
            << "\"minNumberOfGamers\":" << games[i].minNumberOfGamers << ","
            << "\"maxNumberOfGamers\":" << games[i].maxNumberOfGamers << ","
            << "\"numberOfGamers\":" << games[i].numberOfGamers << ","
            << "\"age\":" << games[i].age
            << "}";
        if (i < gameCount - 1) oss << ",";
    }
    oss << "]";
    static string result = oss.str();
    return result.c_str();
}


extern "C" const char* sortingByMaxNumberOfGamers(){
    sort(games, games + gameCount, [](const Game &a, const Game &b){
        return a.maxNumberOfGamers > b.maxNumberOfGamers;
    });

    ostringstream oss;
    oss << "[";
    for(int i = 0; i < gameCount; i++){
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