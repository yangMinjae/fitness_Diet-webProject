package com.serofit.service;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.serofit.domain.BoardListDTO;
import com.serofit.domain.BoardVO;
import com.serofit.domain.DietVO;
import com.serofit.domain.LikeVO;
import com.serofit.domain.UserVO;
import com.serofit.mapper.BoardMapper;
import com.serofit.mapper.DietMapper;
import com.serofit.mapper.LikeMapper;
import com.serofit.mapper.UserMapper;

import lombok.extern.log4j.Log4j;

@Log4j
@Service
public class BoardListServiceImple implements BoardListService {
	@Autowired
	BoardMapper bMapper;
	@Autowired
	DietMapper dMapper;
	@Autowired
	UserMapper uMapper;
	@Autowired
	LikeMapper lMapper;

	// 게시글 목록 불러오기
	@Override
	public List<BoardListDTO> getPostList() {
		List<BoardVO> bList = bMapper.getPostList();
		List<BoardListDTO> dtoList = new ArrayList<BoardListDTO>();

		for (BoardVO board : bList) {
			int uno = board.getUno();
			int dno = board.getDno();
			String nickname = uMapper.readNickname(uno);
			DietVO dvo = dMapper.selectDietByDno(dno);

			BoardListDTO dto = new BoardListDTO(board.getTitle(), nickname, dvo.getTag(), board.getRegDate(),
					board.getHit(), board.getLove());

			dtoList.add(dto);
		}

		return dtoList;
	}

	// 특정 태그를 가진 유저의 게시글만 가져오기
	@Override
	public List<BoardListDTO> getPostsByTag(String tag) {
		// 전체 게시글 목록 가져오기
		List<BoardVO> bList = bMapper.getPostList();
		List<BoardListDTO> dtoList = new ArrayList<>();

		for (BoardVO bvo : bList) {
			int uno = bvo.getUno(); // 게시글 작성자의 UNO 가져오기
			int dno = bvo.getDno(); // DNO 가져오기
			DietVO dvo = dMapper.selectDietByDno(dno);

			// 태그로 필터링
			if (dvo.getTag().equals(tag)) {
				String nickname = uMapper.readNickname(uno);

				BoardListDTO dto = new BoardListDTO(bvo.getTitle(), nickname, dvo.getTag(), bvo.getRegDate(),
						bvo.getHit(), bvo.getLove());

				dtoList.add(dto);
			}
		}

		return dtoList;
	}

	@Override
	public List<BoardListDTO> getPostsByLove(int uno) {
		List<BoardListDTO> allPostByLove = new ArrayList<>();
		List<LikeVO> lvoList = lMapper.findBnoByUno(uno);

		for (LikeVO lvo : lvoList) {
			int bno = lvo.getBno();

			BoardVO bvo = bMapper.getPostByBno(bno);

			// 여기에있는 if문은 우리가 강제로 데이터 집어넣어서 넣은것 ( db정리후 삭제)
			if (bvo == null) {
				System.out.println("bvo가 없음");
				continue;
			}
			//////////////
			int dno = bvo.getDno();
			DietVO dvo = dMapper.selectDietByDno(dno);

			// 여기에있는 if문은 우리가 강제로 데이터 집어넣어서 넣은것 ( db정리후 삭제)
			if (dvo == null) {
				System.out.println("dvo가 없음");
				continue;
			}
			/////////////
			String nickname = uMapper.readNickname(uno);

			BoardListDTO dto = new BoardListDTO(
					bvo.getTitle(),
					nickname, 
					dvo.getTag(),
					bvo.getRegDate(), 
					bvo.getHit(),
					bvo.getLove()
					);
			
			allPostByLove.add(dto);
		}
		return allPostByLove;
	}

}
