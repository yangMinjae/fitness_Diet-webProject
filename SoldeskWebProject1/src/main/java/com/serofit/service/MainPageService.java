package com.serofit.service;

import java.util.List;

import com.serofit.domain.BoardVO;
import com.serofit.domain.HotBoardDTO;

public interface MainPageService {
	// 인기 게시글 불러오기
	public List<HotBoardDTO> getHotPosts(int quantity);
}
