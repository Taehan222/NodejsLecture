//
//  CarViewModel.swift
//  CarListWithNodejs
//
//  Created by 윤태한 on 4/9/25.
//


import Foundation

struct CarViewModel: Identifiable, Codable {
    let id: String
    let name: String
    let price: Int
    let year: Int
    let company: String

		// Codable 프로토콜 구조체에서 사용자 정의 키 매핑을 설정.
		// 반드시  이 이름은 Swift 내부적으로 약속된 CodingKeys 사용.
		// JSON을 받을 경우 자동으로 Swift 구조체로 디코딩.
    enum CodingKeys: String, CodingKey {
        case id = "_id"
        case name, price, year, company
    }
}

struct UserData: Codable {
    let user: String
    let home: String
}

struct APIResponse: Codable {
    let userData: UserData
    let carList: [CarViewModel]
}
