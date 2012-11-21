#!/usr/bin/env ruby
require "fileutils"
require "optparse"
require "pp"

# 2012/9/18.md,16.mdとか、時間名.mdみたいに入れて、それを並べる感じにする.
#日付順にデータを入れて、日記を書く感じ。mdファイルを消すと,ブログ記事も消える.

class DirController
	include FileUtils
	attr_accessor :data_dir,:time
	def initialize
		@time = Time.now
		@data_dir = File.expand_path("public/data",File.join(File.dirname(__FILE__),".."))
	end

	def article_dir
		articles_dir = File.expand_path("articles/",@data_dir)
		return articles_dir
	end

	def mk_article
		file_name = "#{article_dir}/#{@time.year}-#{@time.month}-#{@time.day}.md"
		f = File.open(file_name,"w")
		f.write("hello owrld")
		f.close()
		puts "You can edit \n #{file_name} "
	end

	def mk_dir(dir)
		if File.directory? dir
			puts "#{dir} is already exist."
		else
			FileUtils.mkdir_p dir
			puts "create #{dir}!"
		end
	end


	def rm_article(dir)
		begin 
			FileUtils.rm "#{article_dir}/#{dir}.md"
			puts "removed #{article_dir}/#{dir}.md"
		rescue Exception => e
			puts e
		end
	end

end


opt = OptionParser.new
dir = DirController.new
opt.on("--v"){|v| puts "1.0.0"}

opt.on("--create") do 
	dir.mk_dir(dir.article_dir)
	dir.mk_article
end

opt.on("--remove","rm") do |arg|
	date =  ARGV[0]
	dir.rm_article(date)
end


opt.on("--h","help") do
	puts """
	>> scripts/blog --create 
		create new article
	>> scripts/blog --v
		show current version
	>> scripts/blog --open
		open current dir
	"""
end

opt.on("--open","--o") do
	`open #{dir.article_dir}`
end


opt.on("--show") do 
	 dir.article_dir
end



opt.parse!(ARGV)









