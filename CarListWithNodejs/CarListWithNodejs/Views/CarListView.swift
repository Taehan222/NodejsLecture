//
//  CarListView.swift
//  CarListWithNodejs
//
//  Created by 윤태한 on 4/9/25.
//


import SwiftUI

struct CarListView: View {
    let user: String
    let home: String
    let cars: [Car]

    var body: some View {
        VStack(alignment: .leading) {
            Text("사용자: \(user), 지역: \(home)")
                .font(.headline)
                .padding()

            List(cars) { car in
                VStack(alignment: .leading) {
                    Text("\(car.name) (\(car.company))")
                        .font(.headline)
                    Text("가격: \(car.price)만 원 / 연식: \(car.year)년")
                        .font(.subheadline)
                }
                .padding(.vertical, 5)
            }
        }
        .navigationTitle("자동차 리스트")
    }
}
