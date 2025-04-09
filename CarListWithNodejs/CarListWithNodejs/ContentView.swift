//
//  ContentView.swift
//  CarListWithNodejs
//
//  Created by 윤태한 on 4/9/25.
//

import SwiftUI

struct ContentView: View {
    @State private var username: String = ""
    @State private var userHome: String = ""

    let carList: [Car] = [
        Car(id: "0001", name: "Sonata", price: 3000, year: 2020, company: "HYUNDAI"),
        Car(id: "0002", name: "Gradeur", price: 3050, year: 2019, company: "HYUNDAI"),
        Car(id: "0003", name: "Volvo", price: 4000, year: 2021, company: "Volvo"),
        Car(id: "0004", name: "Benz", price: 4500, year: 2022, company: "Mercedes")
    ]

    var body: some View {
        NavigationView {
            VStack(spacing: 20) {
                TextField("사용자 이름 입력", text: $username)
                    .textFieldStyle(RoundedBorderTextFieldStyle())
                    .padding(.horizontal)

                TextField("사는 곳 입력", text: $userHome)
                    .textFieldStyle(RoundedBorderTextFieldStyle())
                    .padding(.horizontal)

                NavigationLink(destination: CarListView(user: username, home: userHome, cars: carList)) {
                    Text("홈 화면으로 이동")
                        .frame(maxWidth: .infinity)
                        .padding()
                        .background(Color.blue)
                        .foregroundColor(.white)
                        .cornerRadius(10)
                        .padding(.horizontal)
                }

                Spacer()
            }
            .navigationTitle("홈 입력")
        }
    }
}


#Preview {
    ContentView()
}
