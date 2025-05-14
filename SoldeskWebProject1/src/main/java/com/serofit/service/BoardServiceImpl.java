package com.serofit.service;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.serofit.domain.BoardListDTO;
import com.serofit.domain.BoardVO;
import com.serofit.domain.BoardViewDTO;
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
public class BoardServiceImpl implements BoardService {
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
			
			BoardListDTO dto = new BoardListDTO(
					board.getTitle(),
					nickname, 
					dvo.getTag(), 
					board.getRegDate(),
					board.getHit(), 
					board.getLove(), 
					board.getBno());

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
			int uno = bvo.getUno(); 
			int dno = bvo.getDno(); 
			DietVO dvo = dMapper.selectDietByDno(dno);

			// 태그로 필터링
			if (dvo.getTag().equals(tag)) {
				String nickname = uMapper.readNickname(uno);

				BoardListDTO dto = new BoardListDTO(
						bvo.getTitle(), 
						nickname, 
						dvo.getTag(), 
						bvo.getRegDate(),
						bvo.getHit(),
						bvo.getLove(), 
						bvo.getBno());

				dtoList.add(dto);
			}
		}

		return dtoList;
	}

	// 본인이 좋아요한 게시글 목록 가져오기
	@Override
	public List<BoardListDTO> getPostsByLove(int uno) {
		List<BoardListDTO> allPostByLove = new ArrayList<>();
		List<LikeVO> lvoList = lMapper.findBnoByUno(uno);

		for (LikeVO lvo : lvoList) {
			int bno = lvo.getBno();

			BoardVO bvo = bMapper.getPostByBno(bno);

			int dno = bvo.getDno();
			DietVO dvo = dMapper.selectDietByDno(dno);

			String nickname = uMapper.readNickname(uno);

			BoardListDTO dto = new BoardListDTO(
					bvo.getTitle(), 
					nickname, 
					dvo.getTag(), 
					bvo.getRegDate(), 
					bvo.getHit(),
					bvo.getLove(), 
					bvo.getBno());

			allPostByLove.add(dto);
		}
		return allPostByLove;
	}

	@Override
	public BoardViewDTO getPost(int bno) {
		BoardVO bvo = bMapper.getPostByBno(bno);

		BoardViewDTO bvDTO = new BoardViewDTO(
				bvo.getTitle(),
				uMapper.readNickname(bvo.getUno()),
				dMapper.selectDietByDno(bvo.getDno()).getTag(),
				bvo.getContent(),
				bvo.getRegDate(),
				bvo.getHit(),
				bvo.getLove(),
				bvo.getUno(),
				bvo.getBno(),
				bvo.getDno()
				);
		return bvDTO;
	}
	// 게시글 수정
	@Override
	public int updatePost(BoardVO bvo) {		
		int result = bMapper.updatePost(bvo);
		
		return result;
	}

	@Transactional
	@Override
	public int increaseLove(LikeVO lvo) {
		lMapper.insertByBnoAndUno(lvo);
		return bMapper.updateLike(lvo.getBno(), 1);
	}

	@Transactional
	@Override
	public int deletePost(int bno) {
		lMapper.deleteByBno(bno);
		return bMapper.deletePostByBno(bno);
	}

	@Override
	public int increaseHit(int bno) {
		return bMapper.updateHit(bno);
	}
	
	@Override
	public int isLoveBoardByUno(LikeVO lvo) {
		return lMapper.isLoveBoardByUno(lvo);
	}
	
	@Override
	public int decreaseLove(LikeVO lvo) {
		lMapper.deleteByBnoAndUno(lvo);		
		return bMapper.updateLike(lvo.getBno(), -1);
	}
}
